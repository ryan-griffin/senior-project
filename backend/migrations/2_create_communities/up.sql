-- Your SQL goes here

CREATE TABLE communities (
    name VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    user VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES users(username)
)
