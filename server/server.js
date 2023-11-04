const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const responseTime = require("response-time");


const app = express();
app.use(responseTime());

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const activityRouter = require('./routes/activities.router');
const skillsRouter = require('./routes/skills.router');
const userActivitiesRouter = require('./routes/user-activities.router');
const achievementsRouter = require('./routes/achievements.router');
const avatarsRouter = require('./routes/avatars.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/activity', activityRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/user-activities', userActivitiesRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/avatars', avatarsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
