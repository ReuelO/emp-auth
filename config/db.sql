CREATE DATABASE IF NOT EXISTS emp_auth;

USE emp_auth;

CREATE TABLE users(
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);