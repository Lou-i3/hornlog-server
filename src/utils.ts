import { PrismaClient } from '@prisma/client'
import { verifyIdToken } from './firebase'

export interface Context {
  prisma: PrismaClient
  req: any
  user: Auth
}

export interface Auth {
  id: string
  admin: boolean
  [key: string]: any
}

export async function getUser(ctx) {
  let Authorization;
  if (ctx.req) {
    Authorization = (ctx.req || ctx.request).get('Authorization')
  } else if (ctx) {
    Authorization = ctx
  }
  // console.log('getUser', Authorization);
  console.log('getUser origin', ctx.req.headers.origin);

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    // const { id, admin } = (await verifyUserSessionToken(token)) as Auth
    if (token != "") {
      console.log("token", token);

      var user;
      await verifyIdToken(token).then(function (decodedToken) {
        // console.log("decodedToken", decodedToken);
        user = decodedToken;
        // console.log('user found: ', user);
        // return {user};

      }).catch(function (error) {
        // console.log("error", error);
        console.log('error finding user');
        user = null;
        return null;
      });

      // console.log('second time, found: ',user)
      // .catch(e => {
      //   console.log("error", e);
      // });
      return user
    }
  }
  // return null
}

export class AuthError extends Error {
  constructor(
    error: { message: string; stack?: any } = { message: 'Not authorized' },
  ) {
    super(error.message)
  }
}