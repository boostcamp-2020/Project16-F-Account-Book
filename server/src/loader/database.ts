import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import SnakeNamingStrategy from '@config/orm/snake-naming-strategy';
import ormConfig from '@config/orm';

const createDBConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const namingStrategy = new SnakeNamingStrategy();

  const connection = await createConnection(
    Object.assign(connectionOptions, {
      ...ormConfig,
      namingStrategy,
    }),
  );
  console.log('✌️ Database Connected');
  return connection;
};

export default createDBConnection;
