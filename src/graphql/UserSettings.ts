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
export const UserSettings = objectType({
    name: 'UserSettings',
    definition(t) {
        t.nonNull.id('id')
        
        t.nonNull.field('user', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.partner
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .user()
            },
        })

        //t.field('darkMode', { type: 'darkModeChoice' })

        t.nonNull.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })
    },
})

export const darkModeChoice = enumType({
    name: "darkModeChoice",
    members: ['Light', 'Dark'],
    description: 'Dark Mode Choices'
})