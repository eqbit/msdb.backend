import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './Redis';
import { createSchema } from './utils';
import { updater } from './api/tmdb/parser';

const main = async () => {
  await createConnection();

  const schema = await createSchema();

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
      secret: 'hhb2j3n4lk#km5$kn3mn$;;kn?lmkd?',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server listening http://localhost:4000/graphql');
  });
};

main();
updater();
