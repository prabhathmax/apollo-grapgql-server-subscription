import { ApolloServer } from 'apollo-server';
import createSchema from './graphql';
import createContext from './context';

const port = /^\d+$/.test(process.env.PORT) ? Number(process.env.PORT) : 4000;
(async () => {
  const context = await createContext();
  const server = new ApolloServer({
    schema: createSchema(),
    context: async ({ connection }) => {
      if (connection) {
        // check connection for metadata
        return connection.context;
      }
      return {
        ...context,
      };
    },
  });

  server.listen({ port }, () => {
    /* eslint-disable no-console */
    /* eslint-disable no-console */
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(
      `🚀 Subscription Server ready at http://localhost:${port}${server.subscriptionsPath}`,
    );
  });
})().catch(error => {
  /* eslint-disable no-console */
  console.log(error);
});
