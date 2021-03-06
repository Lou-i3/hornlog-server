const { ApolloServer } = require('apollo-server');
import { schema } from './src/schema';
// import { createContext } from './src/context';
import { getUser } from './src/utils'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const server = new ApolloServer({
    schema: schema,
    context: async (req: any) => {
        console.log(' - - - - index req', req.req.res.req.body.operationName, " - - - - -" );

        var user;
        await getUser(req).then(resp => {
            user = resp;
            console.log('index finished, user: ', resp);
            // return resp;
            

        })
        // console.log('index headers', req.req.res.req.headers );
        console.log('user index', user);
        // console.log('index req', req)
        return { ...req, prisma, user }
      },
});


server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});