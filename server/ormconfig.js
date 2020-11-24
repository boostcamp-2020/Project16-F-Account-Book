module.exports = {
    type: 'mysql',
    host: TYPEORM_HOST,
    port: TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*.ts', 'entity/*.js'],
    migrations: ['src/migrations/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscriber',
    },
};
