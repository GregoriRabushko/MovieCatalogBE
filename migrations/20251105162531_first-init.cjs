/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const APP_TABLE_NAME = process.env.APP_TABLE_NAME ?? 'application';
    const APP_VERSION_COLUMN_NAME = process.env.APP_VERSION_COLUMN_NAME ?? 'version';

    await knex.schema
        .dropTableIfExists(APP_TABLE_NAME)
        .raw(`
            CREATE TABLE ${APP_TABLE_NAME} (
                id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                ${APP_VERSION_COLUMN_NAME} varchar(11) NOT NULL
            );
        `);

    await knex(APP_TABLE_NAME).insert([
        {version: "0.0.0",},
    ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
}
