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
        t.field('protectionType', { type: 'ProtectionType' })
        t.string('mood')
        t.boolean('addToAppleHealth')
        t.boolean('archived')
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
                console.log(username)
                // if (typeof userId !== string) return res.status(404).send('invalid username')
                return context.prisma.user.findUnique({
                    where: {
                        username: username,
                        // email: email
                    },
                }).hooks()
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

                return context.prisma.hook.create({
                    data: {
                        hookType: args.data.hookType,
                        owner: {
                            connect: { username: username },
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
        t.field('protectionType', { type: 'ProtectionType' })
        t.string('mood')
        t.boolean('addToAppleHealth')
        t.boolean('protected')
        t.boolean('archived')
    },
})
