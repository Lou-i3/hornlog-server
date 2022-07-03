import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    extendType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType,

} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
// import { getUserId, APP_SECRET } from '../utils';
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


import { Context } from '../utils';



// definitions 
export const Hook = objectType({
    name: 'Hook',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })

        t.nonNull.field('hookType', { type: 'HookType' })
        t.nonNull.field('owner', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.hook
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .owner()
            },
        })

        t.nonNull.field('dateTime', { type: 'DateTime' })
        t.int('duration')
        t.boolean('orgasm')
        t.boolean('porn')
        t.string('note')
        t.int('grade')
        t.field('protected', { type: 'ProtectionType' })
        t.string('mood')
        t.boolean('addToAppleHealth')
        t.boolean('archived')


        t.field('location', {
            type: 'Location',
            resolve: (parent, _, context) => {
                return context.prisma.hook
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .location()
            },
        })
        t.list.field('partners', {
            type: 'Partner',
            resolve: async (parent, _, context) => {


                const hooksOnPartners = await context.prisma.hooksOnPartners.findMany({
                    where: { hookId: parent.id },
                    include: {
                        partner: {
                            include: {
                                person: true
                            }
                        }
                    }
                })

                const partners = hooksOnPartners.map(hooksOnPartner => hooksOnPartner.partner)

                // console.log("coucou")
                // console.log(partners)
                return partners
            },
        })
    },
})

export const HookType = enumType({
    name: "HookType",
    members: ['Date', 'one_night_stand', 'self_pleasure', 'sex_friend', 'Friend', 'Sexting'],
    description: 'Types of Hook'
})

export const ProtectionType = enumType({
    name: "ProtectionType",
    members: ['Protected', 'Unprotected', 'not_required'],
    description: 'Types of protection'
})


// queries 
export const HookQuery = extendType({
    type: 'Query',
    definition(t) {
        // Query for all my hooks
        t.list.field('myHooks', {
            type: 'Hook',
            resolve: async (_parent, _args, context) => {
                const username = context.user.user_id;
                // const email = context.user.email;
                console.log('contect myHooks', context.user);
                // console.log(username)
                // if (typeof userId !== string) return res.status(404).send('invalid username')
                const user = await context.prisma.user.findUnique({
                    where: {
                        username: username
                    }
                })
                const hooks = await context.prisma.hook.findMany({
                    where: {
                        owner: user,
                        // email: email
                    },
                    include: {
                        partners: {
                            include: {
                                partner: {
                                    include: {
                                        person: true
                                    }
                                }
                            }
                        },
                    }
                });
                // console.log('hooks', hooks);
                // console.log('hooks 1', hooks[0]);
                // console.log('hooks partners', hooks[0].partners);
                return hooks
            },
        })

        t.list.field('allHooks', {
            type: 'Hook',
            resolve: (_parent, _args, context) => {
                return context.prisma.hook.findMany()
            },
        })
    },
})

// mutations 
export const HookMutation = extendType({
    type: 'Mutation',
    definition(t) {

        t.nonNull.field('addHook', {
            type: 'Hook',
            args: {
                data: nonNull(
                    arg({
                        type: 'HookCreateInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("AddHook")
                const username = context.user.user_id;

                let additionalPartners = args.data.additionalPartners;
                let partnersToAssociate = [];
                if (additionalPartners && additionalPartners.length > 0) {
                    partnersToAssociate = additionalPartners.map(partner => {
                        return {
                            assignedBy: username,
                            partner: {
                                connect: {
                                    id: partner.id
                                }
                            }
                        }
                    })
                }

                return context.prisma.hook.create({
                    data: {
                        hookType: args.data.hookType,
                        owner: {
                            connect: { username: username },
                        },
                        partners: {
                            create: partnersToAssociate
                        },
                        dateTime: args.data.dateTime,
                        duration: args.data.duration,
                        orgasm: args.data.orgasm,
                        porn: args.data.porn,
                        note: args.data.note,
                        grade: args.data.grade,
                        protected: args.data.protected,
                        mood: args.data.mood,
                        addToAppleHealth: args.data.addToAppleHealth,
                        archived: args.data.archived,
                    },
                })
            },
        })

        t.nonNull.field('editHook', {
            type: 'Hook',
            args: {
                data: nonNull(
                    arg({
                        type: 'HookUpdateInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("editHook")
                const username = context.user.user_id;

                // const partners = args.data.

                // console.log(args.data);


                let additionalPartners = args.data.additionalPartners;
                let partnersToAssociate = [];
                if (additionalPartners && additionalPartners.length > 0) {
                    partnersToAssociate = additionalPartners.map(partner => {
                        return {
                            assignedBy: username,
                            partner: {
                                connect: {
                                    id: partner.id
                                }
                            }
                        }
                    })
                }

                let newPartners = args.data.newPartners;
                let partnersToCreate = [];
                if (newPartners && newPartners.length > 0) {
                    partnersToCreate = newPartners.map(partner => {
                        return {
                            assignedBy: username,
                            partner: {

                                create: {
                                    owner: {
                                        connect: {
                                            username: username
                                        }
                                    },
                                    person: {
                                        create: {
                                            nickName: partner.nickName
                                        }
                                    }
                                }
                            }
                        }
                    })
                }

                let removedPartners = args.data.removedPartners;
                let partnersToDelete = [];
                if (removedPartners && removedPartners.length > 0) {
                    partnersToDelete = removedPartners.map((partner) => {
                        return {
                            partnerId: partner.id,
                            hookId: args.data.id,
                        };
                    })
                }

                console.log("partnersToAssociate", partnersToAssociate);
                console.log("partnersToCreate", partnersToCreate);
                console.log("partnersToDelete", partnersToDelete);
                // console.log("partnersToCreate connect", partnersToCreate[0].partner.connect);

                return context.prisma.hook.update({
                    where: {
                        id: args.data.id,
                    },
                    data: {
                        hookType: args.data.hookType,
                        owner: {
                            connect: { username: username },
                        },
                        partners: {
                            create: [...partnersToAssociate, ...partnersToCreate],
                            deleteMany: partnersToDelete
                        },
                        dateTime: args.data.dateTime,
                        duration: args.data.duration,
                        orgasm: args.data.orgasm,
                        porn: args.data.porn,
                        note: args.data.note,
                        grade: args.data.grade,
                        protected: args.data.protected,
                        mood: args.data.mood,
                        addToAppleHealth: args.data.addToAppleHealth,
                        archived: args.data.archived,
                    },
                })
            },
        })

        t.nonNull.field('deleteHook', {
            type: 'Hook',
            args: {
                id: nonNull(intArg())
            },
            resolve: async (_, args, context) => {
                console.log("deleteHook")

                const hook = await HookOwnerCheck(args, context);

                return context.prisma.hook.delete({
                    where: {
                        id: args.id,
                    }
                });
            },
        })

    },
})

export const HookCreateInput = inputObjectType({
    name: 'HookCreateInput',
    definition(t) {
        t.nonNull.field('hookType', { type: 'HookType' })
        t.field('dateTime', { type: 'DateTime' })
        t.int('duration')
        t.boolean('orgasm')
        t.boolean('porn')
        t.string('note')
        t.int('grade')
        t.field('protected', { type: 'ProtectionType' })
        t.string('mood')
        t.boolean('addToAppleHealth')
        t.boolean('archived')

        t.list.field('additionalPartners', { type: 'PartnerToHookInput' })
        t.list.field('newPartners', { type: 'NewPartnerToHookInput' })
    },
})

export const HookUpdateInput = inputObjectType({
    name: 'HookUpdateInput',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.field('hookType', { type: 'HookType' })
        t.field('dateTime', { type: 'DateTime' })
        t.int('duration')
        t.boolean('orgasm')
        t.boolean('porn')
        t.string('note')
        t.int('grade')
        t.field('protected', { type: 'ProtectionType' })
        t.string('mood')
        t.boolean('addToAppleHealth')
        t.boolean('archived')

        t.list.field('additionalPartners', { type: 'PartnerToHookInput' })
        t.list.field('removedPartners', { type: 'PartnerToHookInput' })
        t.list.field('newPartners', { type: 'NewPartnerToHookInput' })
    },
})

export const PartnerToHookInput = inputObjectType({
    name: 'PartnerToHookInput',
    definition(t) {
        t.nonNull.int('id')
        // t.nonNull.field('partner', { type: 'Partner' })
    }
})
export const NewPartnerToHookInput = inputObjectType({
    name: 'NewPartnerToHookInput',
    definition(t) {
        t.nonNull.string('nickName')
    }
})

export const HookOwnerCheck = async (args, context) => {
    const hook = await context.prisma.hook.findUnique({
        where: {
            id: args.id,
        },
        include: {
            owner: true,
        }
    });

    if (!hook) {
        throw new Error('Hook not found');
    }

    if (hook.owner.username !== context.user.user_id) {
        throw new Error('You are not the owner of this hook');
    }

    return hook;
}