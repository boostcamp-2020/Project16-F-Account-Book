import createDBConnection from '@/loader/database';
import { Connection } from 'typeorm';

let connection: Connection;

beforeAll(async () => {
  connection = await createDBConnection();
});

afterAll(async () => {
  await connection.close();
});
