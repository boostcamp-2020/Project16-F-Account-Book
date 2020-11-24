import { createConnection, getConnectionOptions } from 'typeorm';
import SnakeNamingStrategy from '@config/orm/snake-naming-strategy';
import ormConfig from '@config/orm';

const createDBConnection = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions();
  const namingStrategy = new SnakeNamingStrategy();

  await createConnection(
    Object.assign(connectionOptions, {
      ...ormConfig,
      namingStrategy,
    }),
  );
  console.log('✌️ Database Connected');
};

export default createDBConnection;
