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
export const ContactInfo = objectType({
    name: 'ContactInfo',
    definition(t) {
        t.nonNull.id('id')
        
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

        t.string('info')
        t.string('designation')

        // t.nonNull.field('contactType', {type: 'ContactType'})
    },
})

export const ContactType = enumType({
    name: "ContactType",
    members: ['Phone', 'Email', 'Facebook', 'Instagram', 'Snapchat', 'LinkedIn'],
    description: 'Types of Contact'
})
