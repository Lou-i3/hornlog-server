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
export const Gender = objectType({
    name: 'Gender',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })

        t.field('owner', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.hook
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .owner()
            },
        })
        
        t.nonNull.string('label')
        
    },
})

// queries 
export const GenderQueries = extendType({
    type: 'Query',
    definition(t) {
        // Query for all my hooks
        t.list.field('myGenders', {
            type: 'Gender',
            resolve: async (_parent, _args, context) => {
                const username = context.user.user_id;
                // const email = context.user.email;
                console.log('contect myGenders', context.user);
                console.log(username)
                // if (typeof userId !== string) return res.status(404).send('invalid username')
                return context.prisma.user.findUnique({
                    where: {
                        username: username,
                        // email: email
                    },
                }).genders()
            },
        })

        t.list.field('appGenders', {
            type: 'Gender',
            resolve: (_parent, _args, context) => {
                return context.prisma.gender.findMany({
                    where: {
                        ownerId: null
                    }
                })
            },
        })

        t.list.field('accessibleGenders', {
            type: 'Gender',
            resolve: (_parent, _args, context) => {
                const username = context.user.user_id;
                var genders = context.prisma.gender.findMany({
                    where: {
                        ownerId: undefined
                    }
                })
                genders += context.prisma.user.findUnique({
                    where: {
                        username: username,
                        // email: email
                    },
                }).genders()

                return genders
            },
        })
    },
})

// mutations 
export const GenderMutation = extendType({
    type: 'Mutation',
    definition(t) {

        t.nonNull.field('addAppGender', {
            type: 'Gender',
            args: {
                data: nonNull(
                    arg({
                        type: 'GenderInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("addAppGender")
                // const username = context.user.user_id;
                return context.prisma.gender.create({
                    data: {
                        label: args.data.label,
                    },
                })
            },
        })
        t.nonNull.field('addUserGender', {
            type: 'Gender',
            args: {
                data: nonNull(
                    arg({
                        type: 'GenderInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("addUserGender")
                const username = context.user.user_id;

                return context.prisma.gender.create({
                    data: {
                        label: args.data.label,
                        owner: {
                            connect: { username: username },
                        },
                    },
                })
            },
        })

        t.nonNull.field('editGender', {
            type: 'Gender',
            args: {
                id: nonNull(intArg()),
                data: nonNull(
                    arg({
                        type: 'GenderInput',
                    }),
                ),
            },
            resolve: async (_, args, context) => {
                console.log("editGender")
                const username = context.user.user_id;

                return context.prisma.gender.update({
                    where: {
                        id: args.id,
                      },
                      data: {
                        label: args.data.label,
                    },
                })
            },
        })

        t.nonNull.field('deleteGender', {
            type: 'Gender',
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (_, args, context) => {
                console.log("deleteGender")
                const username = context.user.user_id;

                return context.prisma.gender.delete({
                    where: {
                        id: args.id,
                      },
                })
            },
        })

    },
})

export const GenderInput = inputObjectType({
    name: 'GenderInput',
    definition(t) {
        t.nonNull.string('label')
    },
})
