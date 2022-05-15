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
import { HooksOnPartners } from './HooksOnPartners';


// definitions 
export const Partner = objectType({
    name: 'Partner',
    definition(t) {
        t.nonNull.id('id')

        t.nonNull.field('person', {
            type: 'Person',
            resolve: (parent, _, context) => {
                return context.prisma.partner
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .person()
            },
        })

        t.list.field('hooks', {
            type: 'Hook',
            resolve: async (parent, _, context) => {
                const hooksOnPartners = await context.prisma.hooksOnPartners.findMany({
                    where: { partnerId: parent.id },
                    include: { hook: true }
                })
                // .then(hooksOnPartners => {
                //     return hooksOnPartners.map(hooksOnPartner => hooksOnPartner.hook)
                // })
                const hooks = hooksOnPartners.map(hooksOnPartner => hooksOnPartner.hook)
                // console.log("hooks of myhooks", hooksOnPartners)

                return hooks
            },
        })

        t.nonNull.field('owner', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.partner
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .owner()
            },
        })
    },
})

// queries
export const PartnerQuery = extendType({
    type: 'Query',
    definition(t) {
        // Query for all my partners
        t.list.field('myPartners', {
            type: 'Partner',
            resolve: async (_parent, _args, context) => {
                const username = context.user.user_id;
                // const email = context.user.email;
                console.log('contect myPartners', context.user);
                console.log(username)
                // if (typeof userId !== string) return res.status(404).send('invalid username')
                return context.prisma.user.findUnique({
                    where: {
                        username: username,
                        // email: email
                    },
                }).partners()
            },
        })

    },
})

// mutations 
export const PartnerMutation = extendType({
    type: 'Mutation',
    definition(t) {

        t.nonNull.field('addPartner', {
            type: 'Partner',
            args: {
                data: nonNull(
                    arg({
                        type: 'PartnerCreateInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("AddPartner")
                const username = context.user.user_id;

                const newPerson = await context.prisma.person.create({
                    data: {
                        firstName: args.data.firstName,
                        lastName: args.data.lastName,
                        nickName: args.data.nickName,
                        nationality: args.data.nationality,
                        sexuality: args.data.sexuality,
                        sexPosition: args.data.sexPosition,
                        picture: args.data.picture,
                        birthday: args.data.birthday,
                        how: args.data.how,
                        notes: args.data.notes,
                        gender: {
                            connect: {
                                id: args.data.genderId
                            }
                        }
                    }
                })

                args.data.newContactInfos.forEach(async contactInfo => {
                    await context.prisma.contactInfo.create({
                        data: {
                            type: contactInfo.type,
                            info: contactInfo.info,
                            designation: contactInfo.designation,
                            person: {
                                connect: {
                                    id: newPerson.id
                                }
                            }
                        }
                    })
                })

                return context.prisma.partner.create({
                    data: {
                        person: {
                            connect: { id: newPerson.id },
                        },
                        owner: {
                            connect: { username: username },
                        },
                    }, include: {
                        person: true,
                    }
                })
            },
        })

        t.nonNull.field('editPartner', {
            type: 'Partner',
            args: {
                data: nonNull(
                    arg({
                        type: 'PartnerUpdateInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("editPartner")
                const username = context.user.user_id;
                const partner = await context.prisma.partner.findUnique({
                    where: {
                        id: args.data.id,
                    },
                    include: {
                        owner: true,
                        person: true,
                    }
                });
                if (!partner) throw new Error('Partner not found')
                if (partner.owner.username !== username) throw new Error('Not authorized')

                console.log('creating contactInfos', args.data.newContactInfos);

                // creating new contactInfos
                args.data.newContactInfos.forEach(async contactInfo => {
                    await context.prisma.contactInfo.create({
                        data: {
                            type: contactInfo.type,
                            info: contactInfo.info,
                            designation: contactInfo.designation,
                            person: {
                                connect: {
                                    id: partner.person.id
                                }
                            }
                        }
                    })
                })

                console.log('updating existing contactInfos', args.data.updatedContactInfos);

                // updating existing contactInfos
                args.data.updatedContactInfos.forEach(async contactInfo => {
                    await context.prisma.contactInfo.update({
                        where: {
                            id: contactInfo.id,
                        },
                        data: {
                            type: contactInfo.type,
                            info: contactInfo.info,
                            designation: contactInfo.designation,
                            person: {
                                connect: {
                                    id: partner.person.id
                                }
                            }
                        }
                    })
                })

                // deleting existing contactInfos
                args.data.deletedContactInfos.forEach(async contactInfo => {
                    await context.prisma.contactInfo.delete({
                        where: {
                            id: contactInfo.id,
                        },
                    })
                })

                // console.log('updating partner', partner);
                
                return context.prisma.person.update({
                    where: {
                        id: partner.person.id,
                    },
                    data: {
                        firstName: args.data.firstName,
                        lastName: args.data.lastName,
                        nickName: args.data.nickName,
                        nationality: args.data.nationality,
                        sexuality: args.data.sexuality,
                        sexPosition: args.data.sexPosition,
                        picture: args.data.picture,
                        birthday: args.data.birthday,
                        how: args.data.how,
                        notes: args.data.notes,
                        gender: {
                            connect: {
                                id: args.data.genderId
                            }
                        }
                    },
                })
            },
        })

    },
})

export const PartnerCreateInput = inputObjectType({
    name: 'PartnerCreateInput',
    definition(t) {
        t.string('firstName')
        t.string('lastName')
        t.string('nickName')
        t.string('nationality')
        t.field('sexuality', { type: 'Sexuality' })
        t.field('sexPosition', { type: 'SexPosition' })
        t.string('picture')
        t.string('how')
        t.string('notes')
        t.field("birthday", { type: "DateTime" })

        t.list.field("newContactInfos", { type: "ContactInfoCreateInput" })
        
        t.nonNull.int('genderId')
    },
})

export const PartnerUpdateInput = inputObjectType({
    name: 'PartnerUpdateInput',
    definition(t) {
        t.nonNull.int('id')

        t.string('firstName')
        t.string('lastName')
        t.string('nickName')
        t.string('nationality')
        t.field('sexuality', { type: 'Sexuality' })
        t.field('sexPosition', { type: 'SexPosition' })
        t.string('picture')
        t.string('how')
        t.string('notes')
        t.field("birthday", { type: "DateTime" })

        t.list.field("newContactInfos", { type: "ContactInfoCreateInput" })
        t.list.field("updatedContactInfos", { type: "ContactInfoUpdateInput" })
        t.list.field("deletedContactInfos", { type: "ContactInfoDeleteInput" })

        t.int('genderId')

    },
})

export const ContactInfoCreateInput = inputObjectType({
    name: 'ContactInfoCreateInput',
    definition(t) {
        t.string('info')
        t.string('designation')
        t.nonNull.field('type', { type: 'ContactType' })
    }
})

export const ContactInfoUpdateInput = inputObjectType({
    name: 'ContactInfoUpdateInput',
    definition(t) {
        t.nonNull.int('id')
        t.string('info')
        t.string('designation')
        t.nonNull.field('type', { type: 'ContactType' })
    }
})

export const ContactInfoDeleteInput = inputObjectType({
    name: 'ContactInfoDeleteInput',
    definition(t) {
        t.nonNull.int('id')
    }   
})