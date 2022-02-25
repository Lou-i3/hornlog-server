import { allow, rule, shield } from 'graphql-shield'
import { Context, getUser } from '../utils'
// import { getUserId } from '../utils'
import { getUserRecord } from '../firebase'
// import * as admin from "firebase-admin";

const rules = {
  isAuthenticatedUser: rule()(async (_parent, _args, context: Context) => {
    console.log('coucou isAuthenticatedUser');

    console.log(context.user);

    return Boolean(context.user)
  }),
  isUserAdmin: rule()(async (_parent, _args, context: Context) => {
    // const userId = getUserRecord(context)
    const username = context.user.user.user_id;
    const userInstance = await context.prisma.user.findMany({
      where: {
        username: username,
        role: {
          equals: "ADMIN",
        },
      },
    })

    return userInstance.length > 0
  }),
  isUserModerator: rule()(async (_parent, _args, context: Context) => {
    // const userId = getUserRecord(context);
    const username = context.user.user.user_id;

    const userInstance = await context.prisma.user.findMany({
      where: {
        username: username,
        role: {
          equals: "MODERATOR",
        },
      },
    })

    return userInstance.length > 0
  }),
}

export const permissions = shield({

  Query: {
    allUsers: rules.isUserAdmin,
    me: rules.isAuthenticatedUser,
    ok: rules.isAuthenticatedUser,
    myHooks: rules.isAuthenticatedUser,
  },
  Mutation: {
    addHook: rules.isAuthenticatedUser,
  },
  Hook: rules.isAuthenticatedUser,
},
  {
    debug: true
  })
