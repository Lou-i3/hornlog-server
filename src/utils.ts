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
  const Authorization = (ctx.req || ctx.request).get('Authorization')
  // console.log('getUser', Authorization);

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    // const { id, admin } = (await verifyUserSessionToken(token)) as Auth
    const user = await verifyIdToken(token); 
    // console.log('user', user);
    return { user }
  }
  return null
}

export class AuthError extends Error {
  constructor(
    error: { message: string; stack?: any } = { message: 'Not authorized' },
  ) {
    super(error.message)
  }
}