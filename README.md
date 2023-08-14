## Description
Excelerator is a gamified personal development app, where user's can create a personalized set of skills they want to develope. They will then log activities, such as reading a book, taking a course, or listening to a podcast, and specify which skill that activity pertains too. These activities are generalized and preset to be applied to any skill, and each has an associated amount of XP that will be granted to the skill it's being applied to.

In using Excelerator, users will be able to keep track of their personal skills/charactor development and be rewarded for any efforts applied to those things, with the koy of leveling skills up being the motivating factor in their growth!

## Built with:
JS
Node.js
React
PostgreSQL
Express
Material UI



## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `Excelerate`. If you wish to name the database something different, remember to change the reference in `server/modules/pool.js`. Once you've created the database, refer to the `database.sql` file for how to configure your tables. 

## Development Setup Instructions

- Fork the repository.
- Copy the SSH key from your new repo.
- At the directory where you want the project, enter `git clone {SSH-KEY}` into your CLI.
- Run `npm install` in your CLI to install dependencies.
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  <!-- *We also need some things in the .env for deploying to Heroku* -->
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
      (example of this `.env` file can be seen in the `.env-example` file.)
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- If you aren't automatically taken to the app, navigate to `localhost:3000`


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already
- Run `npm start`
- Navigate to `localhost:3000`


## Deployment
<!-- *Need more in-depth information on deploying* -->

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

