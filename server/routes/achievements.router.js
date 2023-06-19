const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id

  // Get the total XP earned by a user
  const totalXpQuery = `
    SELECT
      SUM(activities_chart.xp_value) AS "totalXp"
    FROM activities_chart
      LEFT JOIN user_activities 
        ON user_activities.activity_id = activities_chart.id
    WHERE user_activities.user_id = $1;
  `;

  // Get the skillLevels earned by a user
  const skillLevelsQuery = `
    SELECT
      (SUM(activities_chart.xp_value)/10) AS "skillLevels",
      skills_enterprise.skill_name AS "skillsEnterprise",
      skills_user.skill_name AS "skillsUser"
    FROM activities_chart
      LEFT JOIN user_activities
        ON user_activities.activity_id = activities_chart.id
      LEFT JOIN skills_enterprise
        ON user_activities.skills_enterprise_id = skills_enterprise.id
      LEFT JOIN skills_user
        ON user_activities.skills_user_id = skills_user.id
    WHERE user_activities.user_id = $1
    GROUP BY "skillsEnterprise", "skillsUser";
  `;

  // Get total of each activity completed by a user
  const completedActivitiesQuery = `
    SELECT
      COUNT(activity) as "completedCount",
      activity
    FROM activities_chart
      LEFT JOIN user_activities
        ON user_activities.activity_id = activities_chart.id
    WHERE user_activities.user_id = $1
    GROUP BY activity;
  `;

  ////////////////////////////////////////////////
  // EXECUTE THE SQL TRANSACTION
  ////////////////////////////////////////////////
  const connection = await pool.connect();
  try {
    let {rows: totalXp} = await connection.query( totalXpQuery, [ userId ] )
    totalXp = Number(totalXp[0].totalXp)
    const {rows: skillLevels} = await connection.query ( skillLevelsQuery, [ userId ]  )
    const {rows: completedActivitiesCount} = await connection.query ( completedActivitiesQuery, [ userId ]  )

    let totalSkillLevels = 0;
    skillLevels.map(skill => {
      totalSkillLevels += Number(skill.skillLevels)
    })

    const achievements = {
      totalXp,
      totalSkillLevels,
      completedActivitiesCount,
    }

    res.send( achievements )
  } catch ( dbErr ) {
    console.log( 'Error in GET achievements:', dbErr );
    res.sendStatus( 500 )
  }
});

module.exports = router;