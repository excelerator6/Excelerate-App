-- Start with creating a new database titled: Excelerate

----------------------------------------------------------------
----------------------------------------------------------------
	-- Build "user" table --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE "user" (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	occupation VARCHAR NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE,
	user_avatar_path VARCHAR NOT NULL DEFAULT 'test path'
);

-- Starter data for "user"
INSERT INTO "user"
	(username, password, email, occupation, is_admin, user_avatar_path)
VALUES
	-- username: test1
	-- password: test1
	('test1', '$2a$10$mvHgC4madG9DTnjLL1knS.3eGwr5ygKraosNCj//F/6MYml4aPcye', 'test1@test1.com', 'occupation1', false, 'test1 avatar path'),
	-- username: admin1
	-- password: admin1
	('admin1', '$2a$10$IMQy6fs0P7bRSlxBrG5NduakFhO.LG1aAnZZXHLRRjjr/Vatjzt1.', 'admin1@admin1.com', 'adminOccupation2', true, 'admin1 avatar path');
	

----------------------------------------------------------------
----------------------------------------------------------------
	-- Build activities_chart table with starter data --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE activities_chart (
	id SERIAL PRIMARY KEY NOT NULL,
	activity VARCHAR NOT NULL,
	xp_value INTEGER NOT NULL
);

-- Starter data for activities_chart
INSERT INTO activities_chart
	(activity, xp_value)
VALUES
	-- activities worth 1 xp
	('Interview', 1), ('Listen to a Partial Podcast', 1), ('Read an Article', 1),
	('Reflect/Journal', 1), ('Workout', 1), ('ChatGPT', 1),
	-- activities worth 2 xp
	('Book Summary Hightlight Review', 2), ('Course Participation', 2),
	('Meditate', 2), ('Miscellaneous(+)', 2), ('Read a Book(+)', 2),
	('Study', 2), ('15 Minutes on Snipd', 2),
	-- activities worth 3 xp
	('Micellaneous(++)', 3), ('Learn at Work', 3), ('Learn From a Mentor', 3),
	('Finish Podcast', 3), ('Listen to Partial Audiobook', 3),
	('Speed Read (Partial Book)', 3), ('Review Notes', 3), ('Watch a Video(+)', 3),
	('Deep Reflection', 3),
	-- activities worth 4 xp
	('Complete Book Summary', 4), ('Read a Book(++)', 4), ('Watch a Video(++)', 4),
	-- activities worth 5 xp
	('Class Session', 5), ('Miscellaneous(+++)', 5), ('Apply Learning', 5),
	('Book Review', 5), ('Complete Trip', 5),
	-- activites worth 6-15 xp
	('Read a Book(+++)', 6), ('Watch a Video(+++)', 6), ('Speed Read (Full Book)', 10),
	('Finish a Course', 12),
	-- activities worth 16+ xp
	('Finish an Audiobook', 20), ('Finish a Book (Pages < 100)', 20), 
	('Finish a Book (Pages > 100)', 25);


----------------------------------------------------------------
----------------------------------------------------------------
	-- Build skills_user table --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE skills_user (
	id SERIAL PRIMARY KEY NOT NULL,
	skill_name VARCHAR NOT NULL,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE NOT NULL
);


----------------------------------------------------------------
----------------------------------------------------------------
	-- Build skills_enterprise table --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE skills_enterprise (
	id SERIAL PRIMARY KEY NOT NULL,
	skill_name VARCHAR NOT NULL
);


----------------------------------------------------------------
----------------------------------------------------------------
	-- Build user_activities table --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE user_activities (
	id SERIAL PRIMARY KEY NOT NULL,
	date_completed DATE NOT NULL,
	skill_enterprise_id INTEGER REFERENCES skills_enterprise(id) ON DELETE CASCADE,
	skill_id INTEGER REFERENCES skills_user(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
	activity_id INTEGER REFERENCES activities_chart(id) ON DELETE CASCADE NOT NULL,
	source VARCHAR NOT NULL,
	key_takeaways VARCHAR
);
