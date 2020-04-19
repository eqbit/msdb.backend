import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  async hello() {
    return "Hello world";
  }
}

const main = async () => {
  const schema = await buildSchema(({
    resolvers: [ HelloResolver ]
  }));
  
  const apolloServer = new ApolloServer(({ schema }));
  
  const app = Express();
  
  apolloServer.applyMiddleware({ app })
  
  app.listen(4000, () => {
    console.log('server listening on http://localhost:4000');
  });
};

main();
