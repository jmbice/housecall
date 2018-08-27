DROP DATABASE IF EXISTS housecall;

CREATE DATABASE housecall;

USE housecall;

CREATE TABLE clients (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(50),
  address VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(3),
  zip VARCHAR(15),
  PRIMARY KEY(id)
);

CREATE TABLE services (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  description VARCHAR (200),
  price VARCHAR(20),
  duration VARCHAR(20),
  setup VARCHAR(20),
  cleanup VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE appointments (
  id INT NOT NULL AUTO_INCREMENT,
  client_id INT(10),
  service_id INT(10),
  start_time VARCHAR(20),
  start_date DATE,
  address VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(3),
  zip VARCHAR(15),
  PRIMARY KEY(id),
  FOREIGN KEY(client_id) REFERENCES clients(id),
  FOREIGN KEY(service_id) REFERENCES services(id)
);


INSERT INTO clients (first_name, last_name, phone, email, address, city, state, zip) VALUES ("Milla", "Nizar", "xxx-5x5-94xx", "hotgirl@gmail.com", "123 Test", "Testville", "CA", "12345");
INSERT INTO services (name, description, price, duration, setup, cleanup) VALUES ("60 minute deep tissue", "This is a description of a service", "100", "60", "15", "10");
INSERT INTO services (name, description, price, duration, setup, cleanup) VALUES ("90 minute hot stone", "This is a description of a service", "200", "90", "30", "30");
INSERT INTO appointments (client_id, service_id, start_time, start_date, address, city, state, zip) VALUES (1, 1, "16:00", "2018-09-01", "123 Test", "Testville", "CA", "12345");
INSERT INTO appointments (client_id, service_id, start_time, start_date, address, city, state, zip) VALUES (1, 1, "10:00", "2018-09-02", "123 Test", "Testville", "CA", "12345");
