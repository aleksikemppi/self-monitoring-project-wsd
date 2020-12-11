CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(300) NOT NULL,
  password CHAR(80) NOT NULL
);


CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepduration FLOAT,
  sleepquality INTEGER,
  exercisetime FLOAT,
  studytime FLOAT,
  qualityeating INTEGER,
  morningmood INTEGER,
  eveningmood INTEGER,
  user_id INTEGER REFERENCES users(id)
);

CREATE INDEX ON reports(date);