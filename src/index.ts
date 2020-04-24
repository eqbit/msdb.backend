import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';

import {
  RegisterResolver,
  LoginResolver,
  LoggedResolver,
  LogoutResolver,
  ConfirmUserResolver
} from './modules';
import { redis } from './redis';

const main = async () => {
  await createConnection();
  
  const schema = await buildSchema({
    resolvers: [
      LoggedResolver,
      LogoutResolver,
      RegisterResolver,
      LoginResolver,
      ConfirmUserResolver
    ],
    authChecker: ({ context: { req } }) => !!req.session.userId
  });
  
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    playground: {
      settings: {
        'request.credentials': 'include',
      }
    }
  });
  
  const app = Express();
  
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));
  
  const RedisStore = connectRedis(session);
  
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: 'dasdasd asdasd sadsad',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );
  
  apolloServer.applyMiddleware({ app });
  
  app.listen(4000, () => {
    console.log('server listening http://localhost:4000/graphql');
  });
};

main();
