import { allow, rule, shield } from 'graphql-shield'
import { Context, getUser } from '../utils'
// import { getUserId } from '../utils'
import { getUserRecord } from '../firebase'
// import * as admin from "firebase-admin";

const rules = {
  isAuthenticatedUser: rule()(async (_parent, _args, context: Context) => {
    console.log('Checking: isAuthenticatedUser');
    // var user; 

    // getUser(context).then(resp => {
    //     user = resp;
    //     console.log('user after then', resp);
    //   });
    // console.log('user from context', context.req.get('Authorization'));

    // const test = await getUser(context);
    // console.log(context.user);

    // const user = await getUser(context.req); 
    // console.log('user from context', user);
    context.user ? console.log('\tFor user: ', context.user.email) : console.log('\tNo user in context');

    return Boolean(context.user)
    // return false; 
  }),
  isUserAdmin: rule()(async (_parent, _args, context: Context) => {
    console.log('Checking: isUserAdmin');

    // const userId = getUserRecord(context)
    const username = context.user.user_id;
    console.log('username', username);
    const userInstance = await context.prisma.user.findMany({
      where: {
        username: username,
        role: {
          equals: "ADMIN",
        },
      },
    })

    console.log("userInstance", userInstance);

    return userInstance.length > 0
  }),
  isUserModerator: rule()(async (_parent, _args, context: Context) => {
    // const userId = getUserRecord(context);
    const username = context.user.user_id;

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
    myPartners: rules.isAuthenticatedUser,
    myGenders: rules.isAuthenticatedUser,
    appGenders: rules.isUserAdmin,
    accessibleGenders: rules.isAuthenticatedUser,
  },
  Mutation: {
    addHook: rules.isAuthenticatedUser,
    addAppGender: rules.isUserAdmin,
    addUserGender: rules.isAuthenticatedUser,
    editGender: rules.isAuthenticatedUser,
    deleteGender: rules.isAuthenticatedUser,
  },
  Hook: rules.isAuthenticatedUser
},
  {
    debug: true
  })
