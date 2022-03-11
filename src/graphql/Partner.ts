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
            resolve: (parent, _, context) => {
                return context.prisma.partner
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .hooks()
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