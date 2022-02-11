//Database scripts

CREATE DATABASE familytasks;

USE familytasks;

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    namerole VARCHAR(50)
);

INSERT INTO roles VALUES
(NULL, 'FamilyLeader'),
(NULL, 'FamilyUser');

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    lastname VARCHAR(100),
    familycode INT NOT NULL, //It has to be assigned as a key.
    email VARCHAR(100),
    password VARCHAR(60),
    fk_rol INT,
    FOREIGN KEY(fk_rol)REFERENCES roles(id)
);

CREATE TABLE tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    body TEXT,
    importance VARCHAR(100),
    status VARCHAR(100),
    fk_familycode INT,
    FOREIGN KEY(fk_familycode)REFERENCES users(familycode)
);