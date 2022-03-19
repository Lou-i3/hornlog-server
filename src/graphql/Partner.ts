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