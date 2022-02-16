import { rule, shield } from 'graphql-shield'
import { Context } from '../context'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isUserAdmin: rule()(async (_parent, _args, context: Context) => {
    const userId = getUserId(context)
    const userInstance = await context.prisma.user.findMany({
      where: {
          id: Number(userId),
          role: {
            equals: "ADMIN",
          },
      },
    })
    
    return userInstance.length>0
  }),
  isUserModerator: rule()(async (_parent, _args, context: Context) => {
    const userId = getUserId(context)
    const userInstance = await context.prisma.user.findMany({
      where: {
          id: Number(userId),
          role: {
            equals: "MODERATOR",
          },
      },
    })

    return userInstance.length>0
  }),
}

export const permissions = shield({
  Query: {
    allUsers: rules.isUserAdmin,
    me: rules.isAuthenticatedUser,
    ok: rules.isAuthenticatedUser,
  },
  Mutation: {
  },
})
