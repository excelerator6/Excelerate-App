const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const sqlQuery = `
    SELECT 
      user_activities.id AS id,
      -- format the date as mm/dd/yyyy
      TO_CHAR(user_activities.date_completed, 'mm/dd/yyyy') AS date,
      skills_enterprise.skill_name AS skills_enterprise_name,
      skills_user.skill_name AS skills_user_name,
      user_activities.user_id,
      activities_chart.activity AS activity_name,
      activities_chart.xp_value AS xp_Value,
      user_activities.source AS source,
      user_activities.key_takeaways AS key_takeaways
    FROM user_activities
      LEFT JOIN skills_enterprise
        ON user_activities.skills_enterprise_id = skills_enterprise.id
      LEFT JOIN skills_user
        ON user_activities.skills_user_id = skills_user.id
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
    WHERE user_activities.user_id=$1
  `;

  pool
    .query(sqlQuery, [userId])
    .then(dbRes => {
      const userActivities = dbRes.rows
      res.send(userActivities);
    }).catch(dbErr => {
      console.log("Error connecting to DB within GET user-activities:", dbErr);
      res.sendStatus(500);
    })
});

router.get('/userActivityLog', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const sqlQuery = `
  SELECT DATE(date_completed), COUNT(1) AS count
  FROM user_activities
  WHERE user_id = $1
  GROUP BY DATE(date_completed);
  `;

  pool
    .query(sqlQuery, [userId])
    .then(dbRes => {
      const userActivityLog = dbRes.rows
      res.send(userActivityLog);
    }).catch(dbErr => {
      console.log("Error connecting to DB within GET user activity Log:", dbErr);
      res.sendStatus(500);
    })
});

module.exports = router;