import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) =>
  createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'msdb-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [ `${__dirname}/../entity/*.*` ]
  });
