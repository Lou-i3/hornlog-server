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
export const HooksOnPartners = objectType({
    name: 'HooksOnPartners',
    definition(t) {
        t.nonNull.id('id')
        
        t.nonNull.field('partner', {
            type: 'Partner',
            resolve: (parent, _, context) => {
                return context.prisma.hooksOnPartners
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .partner()
            },
        })

        t.nonNull.field('hook', {
            type: 'Hook',
            resolve: (parent, _, context) => {
                return context.prisma.hooksOnPartners
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .hook()
            },
        })

        t.nonNull.field('assignedAt', { type: 'DateTime' })
        // t.nonNull.field('assignedBy', { type: 'DateTime' })
    },
})