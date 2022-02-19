const { ApolloServer } = require('apollo-server');
import { schema } from './src/schema';
import { createContext } from './src/context';

const server = new ApolloServer({
    schema: schema,
    context: createContext,
});


server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});