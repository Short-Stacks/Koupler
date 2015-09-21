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
  phone BIGINT(10),
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

-- password for all users is 1234
INSERT INTO couples
    (username,
     hash,
     person_1_last_name,
     person_1_first_name,
     person_2_last_name,
     person_2_first_name,
     email,
     phone,
     likes,
     about_us,
     photo_filepath,
     location_city,
     location_zip)
VALUES
    ("pitts",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Pitt",
     "Brad",
     "Jolie",
     "Angelina",
     "brangelina@hollywood.com",
     4159332432,
     0,
     "As friends working at a coffee shop I'm not good at filling out these things hiking. I'm pretty laid-back sleeping late working on my body and my mind what to order off of the menu trying this for the first time, outdoor activities discussing politics using my farmshare I don't take myself too seriously home brewing. Only looking for something casual Neutral Milk Hotel bacon knowing the difference between their/there/they're passionate about if you like my profile.

Game of Thrones it depends on the night Doctor Who joking around. Activity partners The Daily Show as friends just looking to have some fun joking around, thinking about trying yoga joking around crossfit beach days my dogs. Strong and confident recently moved back I'm just a regular guy Family Guy my smartphone my goofy smile.",
     "http://static.ibnlive.in.com/pix/slideshow/02-2010/we-are-still/brangelina_630_1.jpg",
     "San Francisco",
     94108),

    ("beckhams",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Beckham",
     "Victoria",
     "Beckham",
     "David",
     "soccer@euroleague.com",
     4154832302,
     0,
     "I don't really like talking about myself my beard chilling at a bar with friends extrovert. Outdoor activities just looking to have some fun you should message me Infinite Jest Portlandia, Arrested Development The Daily Show short-term dating activity partners too many to list. Chilling at a bar with friends too many to list fascinates me there's no such thing as a typical Friday night making lasagna from scratch fixing my scooter.

I'm looking for art school I don't take myself too seriously vinyl records. Making lasagna from scratch playing my guitar trying this for the first time mountain biking just looking to have some fun, foodie what to order off of the menu working on my body and my mind short-term dating skiing. I'm not good at filling out these things really hoppy beers Netflix outdoorsy sleeping late everything but country music.",
     "http://i.telegraph.co.uk/multimedia/archive/02714/the-beckhams_2714726b.jpg",
     "San Francisco",
     94104),

    ("bowzers",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Duffy",
     "Scruffy",
     "Duffy",
     "Muffy",
     "justbeindogs@dogs.com",
     4159330949,
     2,
     "Exploring the city Indian food making people laugh share a new experience. Introvert fixing my scooter fixing my scooter is pretty awesome Catcher in the Rye, if you're down to actually meet at some point pickles really hoppy beers sushi whiskey. Nothing too complicated going to shows running shoes introvert my eyes outdoorsy.

Parallel parking recently moved back skiing loyal. Chilling at a bar with friends outdoor activities bacon working on my body and my mind Breaking Bad, Myers-Briggs amazing women I've met exploring the city I don't really like talking about myself Netflix. Making people laugh pickles my friends tell me they don't get why I'm single only looking for something casual making people laugh fixing my scooter.",
     "http://www.thepoochmobile.com/wp-content/uploads/2014/05/mobile-dog-wash-denver-las-vegas-two-dogs-02.jpg",
     "San Francisco",
     94118),

    ("fredricksens",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Fredricksen",
     "Carl",
     "Fredricksen",
     "Ellie",
     "fredricksens@mks.com",
     4159228821,
     2,
     "Discussing politics Game of Thrones joking around degree in philosophy. If you like my profile going back to school degree in philosophy exploring the city I'm just a regular guy, activity partners adventures happy hour joking around hiking. Mountain biking crossfit Indian food exploring the city dubstep listening to music.

    Everything but country music mountain biking if you're still reading this Ethiopian. I'm really good at Family Guy my cats optimistic ask me anything, I'm a good listener beach days I value art there's no such thing as a typical Friday night short-term dating. Introvert skiing whatever topic is on NPR Myers-Briggs my eyes honest and direct.",
     "http://cos.h-cdn.co/assets/14/31/980x487/1406832048-1406823730-old_couple.png",
     "San Francisco",
     94132),

    ("turins",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Turin",
     "Jackson",
     "Turin",
     "Shirley",
     "turins@italy.com",
     4158359912,
     2,
     "I'm looking for as friends I don't take myself too seriously Ethiopian. Thinking about trying yoga stepping outside your comfort zone working on my body and my mind I value art The Daily Show, short-term dating fitness I'm not good at filling out these things trying this for the first time Portlandia. Rock climbing mountain biking beach days new friends degree in philosophy feminism.

    Feminism short-term dating Neutral Milk Hotel my cats. My cats I enjoy my friends tell me they don't get why I'm single amazing women I've met foreign films, fascinates me sushi seeing as many countries as possible I enjoy I'm really good at. Vinyl records Murakami local sports teams optimistic adventures optimistic.",
     "http://photos.costume-works.com/full/skeleton_couple.jpg",
     "San Francisco",
     94127),

    ("mouses",
     "$2a$10$OkchGISZINGB1WVlQg4/5.kQPWm.JDwCsC7TCjaKGgD3c6m5J0rZC",
     "Mouse",
     "Mickey",
     "Mouse",
     "Minnie",
     "mouse@rollin.com",
     4159320934,
     2,
     "Going to the gym passionate about my height and shoulders bikes. Myers-Briggs watching a movie art school chilling at a bar with friends I'm just a regular guy, my eyes glass half-full extrovert fixing my scooter recently moved back. If you're down to actually meet at some point it depends on the night art school I have a crush on my height and shoulders happy hour.

    I have a crush on my smartphone loyal the simple things in life. Everything but country music my beard training for the marathon making people laugh shoot me a message, working on my body and my mind if you're still reading this extrovert Netflix fascinates me. Watching a movie activity partners whiskey optimistic amazing women I've met if you think we have something in common.",
     "http://s3.amazonaws.com/kidzworld_photo/images/2011125/3f97cf09-26fb-42dd-96e2-891335d4ca99/gallery_couples1.jpg",
     "San Francisco",
     94114);

INSERT INTO activities (activity_name, activity_type)
VALUES  ("Hiking", "Outdoors"),
        ("Dinner", "Food & Entertainment"),
        ("Opera", "Food & Entertainment"),
        ("Dancing", "Food & Entertainment"),
        ("Doggy Date", "Pets"),
        ("Live Music", "Food & Entertainment"),
        ("Coffee", "Food & Entertainment"),
        ("Sight-Seeing", "Culture");


INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE (activities.activity_name='Dinner' OR
       activities.activity_name='Opera' OR
       activities.activity_name='Hiking' OR
       activities.activity_name='Dancing' OR
       activities.activity_name='Swinging')
AND couples.username='pitts';

INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities

WHERE (activities.activity_name='Dinner' OR
       activities.activity_name='Opera' OR
       activities.activity_name='Dancing' OR
       activities.activity_name='Music Show' OR
       activities.activity_name='Hiking')
AND couples.username='beckhams';



INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities

WHERE (activities.activity_name='Dinner' OR
       activities.activity_name='Sight-Seeing' OR
       activities.activity_name='Music Show' OR
       activities.activity_name='Hiking')
AND couples.username='bowzers';



INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE (activities.activity_name='Dinner' OR
       activities.activity_name='Dancing' OR
       activities.activity_name='Sight-Seeing' OR
       activities.activity_name='Coffee')
AND couples.username='fredricksens';

INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE (activities.activity_name='Swinging' OR
       activities.activity_name='Dancing' OR
       activities.activity_name='Sight-Seeing' OR
       activities.activity_name='Coffee')
AND couples.username='turins';

INSERT INTO couples_activities (couples_id, activities_id)
SELECT couples.id, activities.id
FROM couples, activities
WHERE (activities.activity_name='Dinner' OR
       activities.activity_name='Music Show' OR
       activities.activity_name='Swinging' OR
       activities.activity_name='Hiking')
AND couples.username='mouses';

