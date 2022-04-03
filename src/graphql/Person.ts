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
export const Person = objectType({
    name: 'Person',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })

        t.nonNull.field('owner', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.person
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .owner()
            },
        })

        // t.nonNull.field('dateTime', { type: 'DateTime' })
        t.string('firstName')
        t.string('lastName')
        t.string('nickName')
        t.string('how')
        t.string('notes')
        t.string('picture')
        t.field('gender', { 
            type: 'Gender',
            resolve: (parent, _, context) => {
                return context.prisma.person
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .gender()
            },
        })
        t.field('locations', { 
            type: 'Location',
            resolve: (parent, _, context) => {
                return context.prisma.person
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .locations()
            },
        })
        t.field('birthday', { type: 'DateTime' })
        t.string('nationality')
        t.field('sexuality', { type: 'Sexuality' })
        t.field('sexPosition', { type: 'SexPosition' })

        t.list.field('contactInfos', {
            type: 'ContactInfo',
            resolve: (parent, _, context) => {
                return context.prisma.person
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .contactInfos()
            },
        })
        
    },
})

export const Sexuality = enumType({
    name: "Sexuality",
    members: ['Gay', 'Bi', 'Straight'],
    description: 'Types of Sexuality'
})

export const SexPosition = enumType({
    name: "SexPosition",
    members: ['top', 'vers_top', 'versa', 'vers_bottom', 'bottom'],
    description: 'Types of Positions'
})

// queries 
export const PersonQueries = extendType({
    type: 'Query',
    definition(t) {

        
    },
})