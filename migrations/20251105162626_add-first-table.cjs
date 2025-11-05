/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE movies_catalog (
                                        id VARCHAR(255) PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
                                        description TEXT DEFAULT NULL,
                                        imageURL VARCHAR(255) DEFAULT NULL,
                                        movieURL VARCHAR(255) NOT NULL,
                                        country VARCHAR(255) DEFAULT NULL,
                                        year INT DEFAULT NULL,
                                        quality VARCHAR(50) DEFAULT NULL,
                                        rating DECIMAL(3,1) DEFAULT NULL,
                                        genre VARCHAR(255) NOT NULL,
                                        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                        duration VARCHAR(50)
        );

        WITH generate_movies AS (
            SELECT
                'm' || LPAD(ROW_NUMBER() OVER ()::TEXT, 3, '0') AS id,
                ('Movie Name ' || ROW_NUMBER() OVER ())::VARCHAR(255) AS name,
                CASE WHEN random() > 0.5 THEN ('Description for Movie ' || ROW_NUMBER() OVER ()) ELSE NULL END::TEXT AS description,
                CASE
                    WHEN random() > 0.5 THEN 'http://localhost:3000/api/get_img/dracula.webp'
                    ELSE 'http://localhost:3000/api/get_img/1744216552-242951142.webp'
                    END::VARCHAR(255) AS imageURL,
                'http://localhost:3000/api/get_videos/default.mp4'::VARCHAR(255) AS movieURL,
                (ARRAY['USA', 'UK', 'Canada', 'Australia', 'France'])[FLOOR(RANDOM()*5)::INT + 1]::VARCHAR(255) AS country,
            EXTRACT(YEAR FROM NOW())::INT + FLOOR(RANDOM()*(-20+1))::INT AS year,
            (ARRAY['HD', 'Full HD', '4K'])[FLOOR(RANDOM()*3)::INT + 1]::VARCHAR(50) AS quality,
            ROUND((RANDOM()*8 + 1)::NUMERIC, 1)::DECIMAL(3,1) AS rating,
            (ARRAY['Action', 'Comedy', 'Drama', 'Horror', 'Thriller'])[FLOOR(RANDOM()*5)::INT + 1]::VARCHAR(255) AS genre,
            NOW()::TIMESTAMP AS createdAt,
            (FLOOR(RANDOM()*180 + 60)::TEXT || ' minutes')::VARCHAR(50) AS duration
        FROM GENERATE_SERIES(1, 100)
            )
        INSERT INTO movies_catalog(id, name, description, imageURL, movieURL, country, year, quality, rating, genre, createdAt, duration)
        SELECT * FROM generate_movies;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies_catalog');
};