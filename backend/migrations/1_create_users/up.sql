-- Your SQL goes here

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
