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
import { getUserId, APP_SECRET } from '../utils';
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


import { Context } from '../context';



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
    members: ['Date', 'one_night_stand','self_pleasure', 'sex_friend', 'Friend', 'Sexting'],
    description: 'Types of Hook'
})

export const ProtectionType = enumType({
    name: "ProtectionType",
    members: ['Protected', 'Unprotected','not_required'],
    description: 'Types of protection'
})


// queries 
export const HookQuery = extendType({
    type: 'Query',
    definition(t) {
        // Query for all my hooks
        t.list.field('myHooks', {
            type: 'Hook',
            resolve: (_parent, _args, context) => {
                const userId = getUserId(context)
                console.log(userId)
                return context.prisma.user.findUnique({
                    where: { id: Number(userId) },
                }).hooks()
            },
        })

        t.list.field('allHooks', {
            type: 'Hook',
            resolve: (_parent, _args, context) => {
                return context.prisma.hook.findMany()
            },
        })
        // Query for currently logged in user
        // t.nullable.field('me', {
        //     type: 'User',
        //     resolve: (_parent, _args, context: Context) => {
        //         const userId = getUserId(context)
        //         return context.prisma.user.findUnique({
        //             where: {
        //                 id: Number(userId),
        //             },
        //         })
        //     },
        // })
    },
})