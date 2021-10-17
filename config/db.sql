CREATE DATABASE IF NOT EXISTS mysqlpassportlogin;

USE mysqlpassportlogin;

CREATE TABLE users(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO
--     users
-- VALUES
--     (1000, "User", "", "");