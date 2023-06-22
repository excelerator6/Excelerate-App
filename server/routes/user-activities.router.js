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
      activities_chart.activity AS activity,
      activities_chart.xp_value AS xp,
      user_activities.source AS source,
      user_activities.key_takeaways AS takeaways
    FROM user_activities
      LEFT JOIN skills_enterprise
        ON user_activities.skills_enterprise_id = skills_enterprise.id
      LEFT JOIN skills_user
        ON user_activities.skills_user_id = skills_user.id
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
    WHERE user_activities.user_id=$1
    ORDER BY date DESC;
  `;

  pool
    .query(sqlQuery, [userId])
    .then(dbRes => {
      const unformattedUserActivities = dbRes.rows
      // Create a formattedUserActivities list that only has a skill key/value pair
      //  A skill will either be the skills_enterprise_name OR the skills_user_name
      let formattedUserActivities = unformattedUserActivities.map((result) => {
        const {
          skills_enterprise_name, skills_user_name,
        } = result
        if (skills_enterprise_name) {
          result = {
            ...result,
            skill: skills_enterprise_name
          }
        }
        else {
          result = {
            ...result,
            skill: skills_user_name
          }
        }
        delete result.skills_enterprise_name
        delete result.skills_user_name
        return result
      }, []).sort((a, b) => (a.date > b.date) ? -1 : 1)
      res.send(formattedUserActivities);
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



router.get('/totalXpSkillsPoints', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const sqlQuery = `
  SELECT 
  CONCAT(skills_user.skill_name , skills_enterprise.skill_name) AS skill,
  SUM(activities_chart.xp_value) AS xp_points
  FROM user_activities
    LEFT JOIN Skills_user
    ON user_activities.skills_user_id = skills_user.id
    LEFT JOIN skills_enterprise
      ON user_activities.skills_enterprise_id = skills_enterprise.id
      LEFT JOIN activities_chart
      ON user_activities.activity_id = activities_chart.id
  WHERE user_activities.user_id=$1
  GROUP BY skills_user.skill_name,skills_enterprise.skill_name  ;
  `;

  pool
    .query(sqlQuery, [userId])
    .then(dbRes => {
      const userTotalXpPoints = dbRes.rows
      res.send(userTotalXpPoints);
    }).catch(dbErr => {
      console.log("Error connecting to DB within GET /totalXpSkillsPoints :", dbErr);
      res.sendStatus(500);
    })
});

module.exports = router;