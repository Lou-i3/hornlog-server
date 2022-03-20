import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
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
export const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('username')
        t.string('displayName')
        t.nonNull.string('email')
        t.nonNull.string('password')
        t.nonNull.field('role', { type: 'Role' })
        t.nonNull.string('resetPasswordToken')
        t.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })
        t.nonNull.field('lastLoginAt', { type: 'DateTime' })
        t.list.field('hooks', {
            type: 'Hook',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .hooks()
            },
        })

        t.list.field('partners', {
            type: 'Partner',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .partners()
            },
        })

        t.list.field('locations', {
            type: 'Location',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .locations()
            },
        })

        t.list.field('genders', {
            type: 'Gender',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .genders()
            },
        })

        t.list.field('contactInfos', {
            type: 'ContactInfo',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .contactInfos()
            },
        })
    },
})

export const Role = enumType({
    name: "Role",
    members: ['ADMIN', 'MODERATOR', 'USER'],
    description: 'Defines authorizations'
})


//queries 
export const UserQuery = objectType({
    name: 'Query',
    definition(t) {
        // Query for all users
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args, context) => {
                return context.prisma.user.findMany()
            },
        })

        // Query for currently logged in user
        t.nullable.field('me', {
            type: 'User',
            resolve: (_parent, _args, context) => {
                // const userId = getUserId(context)
                const username = context.user.user_id;

                return context.prisma.user.findUnique({
                    where: {
                        username: username,
                    },
                })
            },
        })
    },
})

// mutations 
export const UserMutation = objectType({
    name: 'Mutation',
    definition(t) {

        // original signup 
        t.nonNull.field('signupUser', {
            type: 'User',
            args: {
                data: nonNull(
                    arg({
                        type: 'UserCreateInput',
                    }),
                ),
            },
            resolve: (_, args, context) => {

                return context.prisma.user.create({
                    data: {
                        name: args.data.name,
                        email: args.data.email,
                        // password: args.data.password,
                    },
                })
            },
        })

        // addUser 
        t.nonNull.field('addUser', {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                displayName: nonNull(stringArg()),
                password: stringArg(),
                username: nonNull(stringArg()),
            },
            resolve: async (_parent, args, context) => {
                const hashedPassword = await hash(String(args.password), 10)
                const user = await context.prisma.user.create({
                    data: {
                        displayName: args.displayName,
                        email: args.email,
                        username: args.username,
                        password: hashedPassword,
                    },
                })
                return {
                    // token: sign({ userId: user.id }, APP_SECRET),
                    user,
                }
            },
        })

        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_parent, { email, password }, context) => {
                const user = await context.prisma.user.findUnique({
                    where: {
                        email,
                    },
                })
                if (!user) {
                    throw new Error(`No user found for email: ${email}`)
                }
                const passwordValid = await compare(password, String(user.password))
                if (!passwordValid) {
                    throw new Error('Invalid password')
                }
                return {
                    // token: sign({ userId: user.id }, APP_SECRET),
                    user,
                }
            },
        })

    },
})



export const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
})


export const UserUniqueInput = inputObjectType({
    name: 'UserUniqueInput',
    definition(t) {
        t.int('id')
        t.string('username')
        t.string('email')
    },
})

export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.string('token')
        t.field('user', { type: 'User' })
    },
})

export const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
        t.nonNull.string('email')
        t.string('name')
    },
})


function NexusOutputFieldConfig<T, U>(): any {
    throw new Error('Function not implemented.');
}
// module.exports = {
//     DateTime,
//     Query,
//     Mutation,
//     User,
//     SortOrder,
//     UserUniqueInput,
//     UserCreateInput,
// }