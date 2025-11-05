// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {

    development: {
        client: "pg",
        connection: {
            host: process.env.CONNECT_DB_HOST,
            port: process.env.CONNECT_DB_PORT,
            user: process.env.CONNECT_DB_USER,
            database: process.env.CONNECT_DB_NAME,
            password: process.env.CONNECT_DB_PASSWORD,
        },
    },

    production: {
        client: "pg",
        connection: {
            host: process.env.CONNECT_DB_HOST,
            port: process.env.CONNECT_DB_PORT,
            user: process.env.CONNECT_DB_USER,
            database: process.env.CONNECT_DB_NAME,
            password: process.env.CONNECT_DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
    },

    migrations: {
        directory: 'migrations',
        extension: 'cjs',
    },

};

export default config;
