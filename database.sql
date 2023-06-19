-- Start with creating a new database titled: Excelerate

----------------------------------------------------------------
----------------------------------------------------------------
	-- Build "user" table with starter data --
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
	-- Build skills_user table with starter data --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE skills_user (
	id SERIAL PRIMARY KEY NOT NULL,
	skill_name VARCHAR NOT NULL,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE NOT NULL
);

-- Starter info for skills_user
INSERT INTO skills_user
    (skill_name, user_id)
VALUES
    ('Communication', 1), ('Leadership', 1), ('Decision-Making', 1), ('Entrepreneurship', 1),
    ('Sales/Marketing', 1), ('Effectiveness', 1), ('Problem-Solving', 1), ('Self-Discovery', 1),
    ('Confidence', 1);


----------------------------------------------------------------
----------------------------------------------------------------
	-- Build skills_enterprise table with starter data --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE skills_enterprise (
	id SERIAL PRIMARY KEY NOT NULL,
	skill_name VARCHAR NOT NULL
);

-- Starter data for skills_enterprise
INSERT INTO skills_enterprise
	(skill_name)
VALUES
    ('Technology'),
    ('Process Improvement'),
    ('Mindfulness'),
    ('Creativity'),
    ('Discipline');


----------------------------------------------------------------
----------------------------------------------------------------
	-- Build user_activities table with starter data --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE user_activities (
	id SERIAL PRIMARY KEY NOT NULL,
	date_completed DATE NOT NULL,
	skills_enterprise_id INTEGER REFERENCES skills_enterprise(id) ON DELETE CASCADE,
	skills_user_id INTEGER REFERENCES skills_user(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
	activity_id INTEGER REFERENCES activities_chart(id) ON DELETE CASCADE NOT NULL,
	source VARCHAR NOT NULL,
	key_takeaways VARCHAR
);

-- Starter data using skills_user_id
INSERT INTO user_activities
    (date_completed, skills_user_id, user_id, activity_id, source)
VALUES
    ('3/1/2023', 1, 1, 8, 'Robin Roberts - Effective and Authentic Communication | Masterclass'),
    ('3/1/2023', 2, 1, 8, 'Leadership and Influence - Coursera'),
    ('3/2/2023', 1, 1, 8, 'Verbal Communication - Workday Learning'),
    ('3/2/2023', 3, 1, 8, 'Decision-Making Course - Workday Learning'),
    ('3/2/2023', 1, 1, 8, 'Difficult Conversations - Workday Learning'),
    ('3/4/2023', 1, 1, 29, 'Smart Brevity'),
    ('3/5/2023', 3, 1, 14, 'Improve decision making template and take notes on ChatGPT recommendation'),
    ('3/5/2023', 4, 1, 8, 'LinkedIn Course'),
    ('3/5/2023', 3, 1, 17, 'Decision-Making Course - LinkedIn Learning'),
    ('3/5/2023', 2, 1, 20, ''),
    ('3/6/2023', 5, 1, 17, 'Do People Buy From People They Trust? - Advanced Selling Podcast'),
    ('3/6/2023', 6, 1, 20, ''),
    ('3/6/2023', 2, 1, 14, 'Yes AND...'),
    ('3/6/2023', 1, 1, 27, 'Improv Class'),
    ('3/7/2023', 7, 1, 17, 'The Art of Possibility - What You Will Learn Podcast'),
    ('3/8/2023', 1, 1, 17, 'Mindset Mentor - Mastering Communication'),
    ('3/8/2023', 8, 1, 16, 'Meeting with Glen'),
    ('3/9/2023', 9, 1, 17, 'Entreleadership - How to have confidence');
    
-- Starter data using skills_enterprise_id
INSERT INTO user_activities
    (date_completed, skills_enterprise_id, user_id, activity_id, source)
VALUES
    ('3/14/2023', 1, 1, 17, 'ChatGPT pod'),
    ('3/15/2023', 1, 1, 17, 'ChatGPT pod'),
    ('3/20/2023', 2, 1, 23, 'Life of Focus Course'),
    ('3/21/2023', 3, 1, 23, 'The practice of groundedness - Brad Stulberg | Blinkist'),
    ('3/21/2023', 4, 1, 23, 'Creativity - Nihaly Csikszentmihaly | Blinkist'),
    ('3/21/2023', 4, 1, 23, 'Deep Creativity - Deborah Ann Quibell | Blinkist'),
    ('3/21/2023', 5, 1, 23, 'No Excuses! - Brian Tracy | Blinkist');
    
-- Starter data using skills_enterprise_id and key takeaway
INSERT INTO user_activities
    (date_completed, skills_enterprise_id, user_id, activity_id, source)
VALUES
    ('3/14/2023', 1, 1, 17, 'ChatGPT pod'),
    ('3/15/2023', 1, 1, 17, 'ChatGPT pod'),
    ('3/20/2023', 2, 1, 23, 'Life of Focus Course'),
    ('3/21/2023', 3, 1, 23, 'The practice of groundedness - Brad Stulberg | Blinkist'),
    ('3/21/2023', 4, 1, 23, 'Creativity - Nihaly Csikszentmihaly | Blinkist'),
    ('3/21/2023', 4, 1, 23, 'Deep Creativity - Deborah Ann Quibell | Blinkist'),
    ('3/21/2023', 5, 1, 23, 'No Excuses! - Brian Tracy | Blinkist');
    

----------------------------------------------------------------
----------------------------------------------------------------
	-- Build achievements table with starter data --
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE achievements (
	id SERIAL PRIMARY KEY NOT NULL,
	achievement_name VARCHAR NOT NULL,
	achievement_category VARCHAR NOT NULL
);

-- Starter data using for achievements
INSERT INTO achievements
	(achievement_name, achievement_category)
VALUES
	-- XP Earned
	('Earn 1000 XP', 'XP Earned'), ('Earn 1250 XP', 'XP Earned'), ('Earn 1500 XP', 'XP Earned'),
	('Earn 1750 XP', 'XP Earned'), ('Earn 2000 XP', 'XP Earned'), ('Earn 2250 XP', 'XP Earned'),
	('Earn 2500 XP', 'XP Earned'), ('Earn 2750 XP', 'XP Earned'),
	-- Levels Obtained
	('Obtain 1 Level', 'Levels Obtained'), ('Obtain 5 Levels', 'Levels Obtained'), ('Obtain 10 Levels', 'Levels Obtained'),
	('Obtain 25 Levels', 'Levels Obtained'), ('Obtain 50 Levels', 'Levels Obtained'), ('Obtain 100 Levels', 'Levels Obtained'),
	('Obtain 200 Level', 'Levels Obtained'), ('Obtain 500 Levels', 'Levels Obtained'),
	-- Videos Watched
	('Watch 10 Videos', 'Videos Watched'), ('Watch 25 Videos', 'Videos Watched'), ('Watch 50 Videos', 'Videos Watched'),
	('Watch 75 Videos', 'Videos Watched'), ('Watch 100 Videos', 'Videos Watched'), ('Watch 150 Videos', 'Videos Watched'),
	('Watch 200 Videos', 'Videos Watched'), ('Watch 250 Videos', 'Videos Watched'),
	-- Podcasts Finished
	('Listen to 25 Podcasts', 'Podcasts Finished'), ('Listen to 50 Podcasts', 'Podcasts Finished'), ('Listen to 75 Podcasts', 'Podcasts Finished'),
	('Listen to 100 Podcasts', 'Podcasts Finished'), ('Listen to 150 Podcasts', 'Podcasts Finished'), ('Listen to 200 Podcasts', 'Podcasts Finished'),
	('Listen to 250 Podcasts', 'Podcasts Finished'), ('Listen to 500 Podcasts', 'Podcasts Finished'),
	-- Audiobooks Read
	('Listen to 2 Audiobooks', 'Audiobooks Read'), ('Listen to 5 Audiobooks', 'Audiobooks Read'), ('Listen to 10 Audiobooks', 'Audiobooks Read'),
	('Listen to 15 Audiobooks', 'Audiobooks Read'), ('Listen to 20 Audiobooks', 'Audiobooks Read'), ('Listen to 25 Audiobooks', 'Audiobooks Read'),
	('Listen to 35 Audiobooks', 'Audiobooks Read'), ('Listen to 50 Audiobooks', 'Audiobooks Read'),
	-- Books Read
	('Read 2 Books', 'Books Read'), ('Read 5 Books', 'Books Read'), ('Read 10 Books', 'Books Read'),
	('Read 15 Books', 'Books Read'), ('Read 20 Books', 'Books Read'), ('Read 25 Books', 'Books Read'),
	('Read 30 Books', 'Books Read'), ('Read 35 Books', 'Books Read'),
	-- Book Summaries
	('Read 2 Book Summaries', 'Book Summaries'), ('Read 5 Book Summaries', 'Book Summaries'), ('Read 10 Book Summaries', 'Book Summaries'),
	('Read 25 Book Summaries', 'Book Summaries'), ('Read 50 Book Summaries', 'Book Summaries'), ('Read 75 Book Summaries', 'Book Summaries'),
	('Read 100 Book Summaries', 'Book Summaries'), ('Read 200 Book Summaries', 'Book Summaries'),
	-- Articles Read
	('Read 10 Articles', 'Articles Read'), ('Read 5 Articles', 'Articles Read'), ('Read 10 Articles', 'Articles Read'),
	('Read 75 Articles', 'Articles Read'), ('Read 100 Articles', 'Articles Read'), ('Read 150 Articles', 'Articles Read'),
	('Read 200 Articles', 'Articles Read'), ('Read 250 Articles', 'Articles Read'),
	-- Courses Completed
	('Complete 2 Courses', 'Courses Completed'), ('Complete 5 Courses', 'Courses Completed'), ('Complete 10 Courses', 'Courses Completed'),
	('Complete 25 Courses', 'Courses Completed'), ('Complete 50 Courses', 'Courses Completed'), ('Complete 75 Courses', 'Courses Completed'),
	('Complete 100 Courses', 'Courses Completed'), ('Complete 125 Courses', 'Courses Completed');

----------------------------------------------------------------
----------------------------------------------------------------
	-- Build user_achievements table with starter data--
----------------------------------------------------------------
----------------------------------------------------------------
CREATE TABLE user_achievements (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
	achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
	date_achieved DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Starter data using for achievements
INSERT INTO user_achievements
	(user_id, achievement_id)
VALUES
	(1, 9), -- Obtain 1 Level
	(1, 10), -- Obtain 5 Levels
	(1, 50); -- Read 5 Book Summaries


----------------------------------------------------------------
----------------------------------------------------------------
	-- End build tables --
----------------------------------------------------------------
----------------------------------------------------------------
