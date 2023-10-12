-- CREATE TABLE towns (
--     id SERIAL PRIMARY KEY,
--     town_name VARCHAR(255) NOT NULL
-- );
-- CREATE TABLE registration_numbers (
--     id SERIAL PRIMARY KEY,
--     number_text VARCHAR(255) NOT NULL,
--     town_id INT REFERENCES towns(id)
-- );
CREATE TABLE towns (
    town_code VARCHAR(2) PRIMARY KEY,
    town_name VARCHAR(255) NOT NULL
);

CREATE TABLE registration_numbers (
    id SERIAL PRIMARY KEY,
    number_text VARCHAR(255) NOT NULL,
    town_code VARCHAR(2) REFERENCES towns(town_code)
);