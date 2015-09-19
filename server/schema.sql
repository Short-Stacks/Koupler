DROP DATABASE IF EXISTS app_db;

CREATE DATABASE app_db;

USE app_db;

DROP TABLE IF EXISTS couples;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS couples_activities;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS total_messages;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS zip_codes;


/********* TABLE COUPLES *********/

-- all couples

CREATE TABLE couples (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  hash VARCHAR(256) NOT NULL,
  person_1_last_name VARCHAR(32) NOT NULL,
  person_1_first_name VARCHAR(32) NOT NULL,
  person_2_last_name VARCHAR(32) NOT NULL,
  person_2_first_name VARCHAR(32) NOT NULL,
  email VARCHAR(64),
  phone INT(10),
  likes INT(10),
  about_us VARCHAR(4096),
  photo_filepath VARCHAR(256),
  location_city VARCHAR(128),
  location_zip INT(10),

  PRIMARY KEY(id)
);


/********* TABLE ACTIVITIES *********/

-- all activities

CREATE TABLE activities (
  id INT NOT NULL AUTO_INCREMENT,
  activity_name VARCHAR(32) NOT NULL,
  activity_type VARCHAR(32),

  PRIMARY KEY(id)
);


/********* TABLE COUPLES_ACTIVITIES *********/

-- Intersection table between couples and activities

CREATE TABLE couples_activities (
  couples_id INT NOT NULL,
  activities_id INT NOT NULL,

  FOREIGN KEY (couples_id)
    REFERENCES couples(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  FOREIGN KEY (activities_id)
    REFERENCES activities(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


/********* TABLE PHOTOS *********/

-- Path and metadata for all photos

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  couples_id INT NOT NULL,
  photo_tags varchar(16) NOT NULL,
  photo_path VARCHAR(100) NOT NULL,
  photo_notes VARCHAR(1024),
  public TINYINT DEFAULT 0,

  PRIMARY KEY(id),

  FOREIGN KEY (couples_id)
    REFERENCES couples(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


/********* TABLE EVENTS *********/

-- All events the two couples did together

CREATE TABLE events (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  activities_id INT NOT NULL,
  couples_id INT NOT NULL,
  photos_id INT NOT NULL,
  comments VARCHAR(4096),

  PRIMARY KEY(id),

  FOREIGN KEY (activities_id)
    REFERENCES activities(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  FOREIGN KEY (couples_id)
    REFERENCES couples(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  FOREIGN KEY (photos_id)
    REFERENCES photos(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


/********* TABLE TOTAL_MESSAGES *********/

-- Store the total number of messages sent between users

CREATE TABLE total_messages (
/*
  identifier: unique key for conversation between specific couples.
              First couples_id + second couples_id, separated by a colon.
              Example identifier: couples_id3:couples_id5
*/
  identifier VARCHAR(255) NOT NULL,
  total_messages INT(10) NOT NULL,

  PRIMARY KEY(identifier)
);


/********* TABLE MESSAGES *********/

-- Store each individual messages between users

CREATE TABLE messages (
  identifier_message_number VARCHAR(255) NOT NULL,
  message VARCHAR(4096) NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sender int NOT NULL,

  PRIMARY KEY(identifier_message_number),

  FOREIGN KEY (sender)
    REFERENCES couples(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);



/***********************************/
/************ TEST DATA ************/
/***********************************/

-- password for both users is 1234
INSERT INTO couples (username, hash, person_1_last_name, person_1_first_name, person_2_last_name, person_2_first_name, email, phone, likes, about_us, photo_filepath)
VALUES ("pitts", "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC", "Pitt", "Brad", "Jolie", "Angelina", "brangelina@hollywood.com", 1234567890, 0, "We have six children. Max, Pax, Zahara, Shiloh, Knox, and Vivienne", "add/path/to/pic.jpg"),
       ("beckhams", "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC", "Beckham", "Victoria", "Beckham", "David", "soccer@euroleague.com", 1234567890, 0, "We have four children. Brooklyn, Romeo, Cruz, and Harper", "add/path/to/pic.jpg"),
       ("bowzers", "bowzers", "duffy", "scruffy", "duffy", "muffy", "justbeindogs@dogs.com", 5748574857, 2, "Just a couple of dogs, bein' dogs.", "add/path/to/pic.jpg", "Los Angeles", 90210);

INSERT INTO activities (activity_name, activity_type)
VALUES  ("Hiking", "Outdoors"),
        ("Unicorn Hunting", "Outdoors"),
        ("Cat Staring", "Pets"),
        ("Dinner", "Food & Entertainment"),
        ("Opera", "Food & Entertainment"),
        ("Live Music", "Food & Entertainment"),
        ("Dancing", "Food & Entertainment"),
        ("Sight-Seeing", "Culture"),
        ("Doggy Date", "Pets");


INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE couples.username='pitts'
AND activities.activity_name='Dinner';

INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE couples.username='beckhams'
AND activities.activity_name='Dinner';

INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE couples.username='bowzers'
AND activities.activity_name='Dinner';