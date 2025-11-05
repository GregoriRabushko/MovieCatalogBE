import knex from "knex";
import pg from "pg"


export const connectDb = knex({
    client: "pg",
    connection: {
        host: process.env.CONNECT_DB_HOST,
        port: process.env.CONNECT_DB_PORT,
        user: process.env.CONNECT_DB_USER,
        database: process.env.CONNECT_DB_NAME,
        password: process.env.CONNECT_DB_PASSWORD,
    },
    pool: {
        min: 0,
        max: 5,
        afterCreate: (conn, done) => {
            console.log("Connection Established.");
            done();
        },
    },
});


export const poolDb = new pg.Pool({
    host: process.env.CONNECT_DB_HOST,
    port: process.env.CONNECT_DB_PORT,
    user: process.env.CONNECT_DB_USER,
    database: process.env.CONNECT_DB_NAME,
    password: process.env.CONNECT_DB_PASSWORD,
});