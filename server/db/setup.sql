-- create db
CREATE DATABASE "next-gen-guide-development" TEMPLATE template0;

-- in psql, you can connect to the new db with: \c "next-gen-guide-development"
-- Delete old table and its data with: DROP TABLE absolvents;

-- Create table
CREATE TABLE mentors (first_name varchar(40),
  id SERIAL PRIMARY KEY,
  last_name varchar(40),
  high_school_name varchar(40),
  maturita_year integer,
  high_school_abroad varchar(40),
  high_school_abroad_country varchar(40),
  university_1_name varchar(40),
  university_1_country varchar(40),
  university_1_program varchar(40),
  university_1_grad_year integer,
  university_2_name varchar(40),
  university_2_country varchar(40),
  university_2_program varchar(40),
  university_2_grad_year integer,
  university_3_name varchar(40),
  university_3_country varchar(40),
  university_3_program varchar(40),
  university_3_grad_year integer,
  working_industry varchar(40),
  role varchar(40),
  company varchar(40),
  country varchar(40),
  previous_role varchar(40),
  previous_company varchar(40),
  previous_country varchar(40),
  image_url varchar(40),
  email varchar(40));

CREATE TABLE mentees (first_name varchar(40),
  id SERIAL PRIMARY KEY,
  last_name varchar(40),
  high_school_name varchar(40),
  maturita_year integer,
  fields_of_interest text[],
  email varchar(40));

-- Insert some values
INSERT INTO mentors VALUES ('Zuzana',
  DEFAULT,
  'Arnoldova',
  'Gymnazium na Zatlance',
  2009,
  null,
  null,
  'Karlova Univerzita',
  'Ceska republika',
  'Sociologie',
  '2012',
  'Goteborg University',
  'Sweden',
  'European Studies',
  null,
  'Unicorn College',
  'Ceska republika',
  'Software Engineering',
  null,
  'IT',
  'Software Developer',
  'MSD',
  'Software Developer',
  'Leedfeader',
  'Finland',
  'www.image.com/url.jpg',
  'zuzana@gmail.com');

INSERT INTO mentees VALUES ('John',
  DEFAULT,
  'Doe',
  'Gymnazium Boticska',
  '2019',
  '{Biology, Zoology, Astronomy}',
  'john.doe@email.com');

