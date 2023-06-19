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

  // GET the achievements already completed by the user
  const completedAchievementsQuery = `
    SELECT
      achievements.achievement_name AS achievement,
      achievements.achievement_category AS category,
      date_achieved AS date
    FROM user_achievements
      LEFT JOIN achievements
        ON user_achievements.achievement_id = achievements.id
    WHERE user_id = $1; 
  `;

  // GET ALL info from the achievements table
  const allAchievementsQuery = `
    SELECT
      achievement_name AS achievement,
      achievement_category AS category
    FROM achievements
    ORDER BY achievement_category;
  `;

  ////////////////////////////////////////////////
  // EXECUTE THE SQL TRANSACTION
  ////////////////////////////////////////////////
  const connection = await pool.connect();
  try {
    let { rows: totalXp } = await connection.query( totalXpQuery, [ userId ] )
    totalXp = Number( totalXp[0].totalXp )
    const { rows: skillLevels } = await connection.query( skillLevelsQuery, [ userId ]  )
    const { rows: completedActivitiesCount } = await connection.query( completedActivitiesQuery, [ userId ]  )
    const { rows: completedAchievements } = await connection.query( completedAchievementsQuery, [ userId ] )
    const { rows: allAchievements } = await connection.query( allAchievementsQuery )

    const allAchievementsFormatted = allAchievements.reduce( ( result, item ) => {
      let { achievement, category } = item
      category =  category.charAt(0).toLowerCase() + category.replace(' ', '').slice(1)
      if (result[category]) {
        result[category].achievements.push(achievement)
      }
      else {
        result[category] = {
          achievements: [achievement]
        }
      }
      return result
    })
    console.log(allAchievementsFormatted);

    let totalSkillLevels = 0;
    skillLevels.map(skill => {
      totalSkillLevels += Number(skill.skillLevels)
    })

    const achievementsData = {
      allAchievements,
      userAchievements: {
        totalXp,
        totalSkillLevels,
        completedActivitiesCount,
        completedAchievements,
      },
    }

    res.send( achievementsData )
  } catch ( dbErr ) {
    console.log( 'Error in GET achievements:', dbErr );
    res.sendStatus( 500 )
  }
});

module.exports = router;