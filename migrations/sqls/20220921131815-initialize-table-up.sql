CREATE SCHEMA IF NOT EXISTS main;
SET search_path TO main, public;

CREATE TABLE IF NOT EXISTS role (
  id INT NOT NULL,
  role_name TEXT NOT NULL,
  CONSTRAINT pk_role_id PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(100),
  address VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT pk_user_id PRIMARY KEY(id),
  CONSTRAINT fk_role_id
    FOREIGN KEY(role_id)
    REFERENCES role(id)
);


CREATE TABLE IF NOT EXISTS customer (
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  website VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT pk_customer_id PRIMARY KEY(id),
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES "user" (id)
);
