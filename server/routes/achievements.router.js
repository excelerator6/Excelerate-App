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
      TO_CHAR(date_achieved, 'mm/dd/yyyy') AS date
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
    ORDER BY id;
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
    const { rows: allAchievementsUnformatted } = await connection.query( allAchievementsQuery )

    // console.log('allAchievementsUnformatted:', allAchievementsUnformatted);

    let allAchievementsFormatted = allAchievementsUnformatted.reduce( ( result, item ) => {
      let { achievement, category } = item
      category =  category.charAt(0).toLowerCase() + category.replace(' ', '').slice(1)
      if (!result[category]) {
        result[category] = [achievement]
      }
      else {
        result[category].push(achievement)
      }
      return result
    }, {})

    let totalSkillLevels = 0;
    skillLevels.map(skill => {
      totalSkillLevels += Number(skill.skillLevels)
    })

    const achievementsData = {
      allAchievements: allAchievementsFormatted,
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

router.post('/', rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;

  ////////////////////////////////////////////////
  // EXECUTE THE SQL TRANSACTION
  ////////////////////////////////////////////////
  const connection = await pool.connect();
  try {
    // Get the arrays of achievements for each achievement category
    const xpEarnedAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Xp Earned';
    `;
    const { rows: xpEarnedAchievements } = await connection.query(xpEarnedAchievementsQuery)
    const levelsObtainedAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Levels Obtained';
    `;
    const { rows: levelsObtainedAchievement } = await connection.query(levelsObtainedAchievementsQuery)
    const videosWatchedAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Videos Watched';
    `;
    const { rows: videosWatchedAchievements } = await connection.query(videosWatchedAchievementsQuery)
    const podcastsFinishedAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Podcasts Finished';
    `;
    const { rows: podcastsFinishedAchievements } = await connection.query(podcastsFinishedAchievementsQuery)
    const audiobooksReadAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Audiobooks Read';
    `;
    const { rows: audiobooksReadAchievements } = await connection.query(audiobooksReadAchievementsQuery)
    const booksReadAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Books Read';
    `;
    const { rows: booksReadAchievements } = await connection.query(booksReadAchievementsQuery)
    const bookSummariesAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Book Summaries';
    `;
    const { rows: bookSummariesAchievements } = await connection.query(bookSummariesAchievementsQuery)
    const articlesReadAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Articles Read';
    `;
    const { rows: articlesReadAchievements } = await connection.query(articlesReadAchievementsQuery)
    const coursesCompletedAchievementsQuery = `
      SELECT id FROM achievements
      WHERE achievement_category = 'Courses Completed';
    `;
    const { rows: coursesCompletedAchievements } = await connection.query(coursesCompletedAchievementsQuery)
    // Get the achievements the user has already completed
    const userCompletedAchievementsQuery = `
      SELECT
        achievement_id,
        achievement_name
      FROM user_achievements
        JOIN achievements
          ON user_achievements.achievement_id = achievements.id
      WHERE user_id = $1;
    `;
    const { rows: userCompletedAchievements } = await connection.query(userCompletedAchievementsQuery, [userId])
    console.log('userCompletedAchievements:', userCompletedAchievements);
    
    // Get the totals for what the user has done to compare vs completed achievements
    // and then POST a new achievement if it has been completed

    // Get the total amount of xp gained by the user
    const userTotalXpPointsQuery = `
      SELECT 
        SUM(activities_chart.xp_value) AS xp_points
      FROM user_activities
        LEFT JOIN activities_chart
          ON user_activities.activity_id = activities_chart.id
      WHERE user_activities.user_id = $1;
    `;
    const { rows: userTotalXpPoints } = await connection.query(userTotalXpPointsQuery, [userId])
    let totalXpPoints = Number(userTotalXpPoints[0].xp_points)
    switch (totalXpPoints) {
      case (totalXpPoints >= 2750):
        break
      case (totalXpPoints >= 2500):
        break
      case (totalXpPoints >= 2250):
        break
      case (totalXpPoints >= 2000):
        break
      case (totalXpPoints >= 1750):
        break
      case (totalXpPoints >= 1500):
        break
      case (totalXpPoints >= 1250):
        break
      case (totalXpPoints >= 1000):
        break
      default:
        console.log(`total XP = ${totalXpPoints}. This is not enough to get a new Xp achievement`);
        break
    }

    // Get the total amount of levels gained by the user
    const userAchievedSkillLevelsQuery = `
      SELECT
        (SUM(activities_chart.xp_value)/10) AS "skillLevels",
        skills_user.skill_name AS "skillsUser",
        skills_enterprise.skill_name AS "skillsEnterprise"
      FROM activities_chart
        LEFT JOIN user_activities
          ON user_activities.activity_id = activities_chart.id
        LEFT JOIN skills_enterprise
          ON user_activities.skills_enterprise_id = skills_enterprise.id
        LEFT JOIN skills_user
          ON user_activities.skills_user_id = skills_user.id
      WHERE user_activities.user_id = $1
      GROUP BY "skillsUser", "skillsEnterprise";
    `;
    const { rows: userAchievedSkillLevels } = await connection.query(userAchievedSkillLevelsQuery, [userId])
    let totalSkillLevels = 0;
    if (userAchievedSkillLevels && userAchievedSkillLevels.length > 0) {
      userAchievedSkillLevels.map(skill => {
        totalSkillLevels += Number(skill.skillLevels)
      })
    }
    console.log('totalSkillLevels:', totalSkillLevels);

    // Get the total amount of videos watched by the user
    const userWatchedVideosCountQuery = `
      SELECT
        activities_chart.id AS activity_id,
        activities_chart.activity,
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        (activities_chart.id = 21 OR
        activities_chart.id = 25 OR
        activities_chart.id = 32)
        AND user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userWatchedVideosCount } = await connection.query(userWatchedVideosCountQuery, [userId])
    let totalMoviesWatched = 0;
    if (userWatchedVideosCount.length > 0) { userWatchedVideosCount.map(activity => {
      totalMoviesWatched += Number(activity.count)
    })}
    console.log('totalMoviesWatched:', totalMoviesWatched);

    // Get the total amount of podcasts finished by the user
    const userFinishedPodcastsCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        activities_chart.id = 17 AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userFinishedPodcastsCount } = await connection.query(userFinishedPodcastsCountQuery, [userId])
    let totalFinishedPodcasts = 0
    if (userFinishedPodcastsCount.length > 0) {
      totalFinishedPodcasts = Number(userFinishedPodcastsCount[0].count)
    }
    console.log('totalFinishedPodcasts:', totalFinishedPodcasts);

    // Get the total amount of audiobooks read by the user
    const userFinishedAudiobooksCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        activities_chart.id = 35 AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userFinishedAudiobooksCount } = await connection.query(userFinishedAudiobooksCountQuery, [userId])
    let totalFinishedAudiobooks = 0
    if (userFinishedAudiobooksCount.length > 0) {
      totalFinishedAudiobooks = Number(userFinishedAudiobooksCount[0].count)
    }
    console.log('totalFinishedAudiobooks:', totalFinishedAudiobooks);

    // Get the total amount of books read by the user
    const userFinishedBooksCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        (activities_chart.id = 36 OR
        activities_chart.id = 37) AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userFinishedBooksCount } = await connection.query(userFinishedBooksCountQuery, [userId])
    let totalFinishedBooks = 0
    if (userFinishedBooksCount.length > 0) {
      totalFinishedBooks = Number(userFinishedBooksCount[0].count)
    }
    console.log('totalFinishedBooks:', totalFinishedBooks);

    // Get the total amount of book summaries read by the user
    const userFinishedBookSummariesCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        activities_chart.id = 23 AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userFinishedBookSummariesCount } = await connection.query(userFinishedBookSummariesCountQuery, [userId])
    let totalFinishedBookSummaries = 0
    if (userFinishedBookSummariesCount.length > 0) {
      totalFinishedBookSummaries = Number(userFinishedBookSummariesCount[0].count)
    }
    console.log('totalFinishedBookSummaries:', totalFinishedBookSummaries);

    // Get the total amount of articles read by the user
    const userFinishedArticlesCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        activities_chart.id = 3 AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    let { rows: userFinishedArticlesCount } = await connection.query(userFinishedArticlesCountQuery, [userId])
    let totalArticlesFinished = 0
    if (userFinishedArticlesCount.length > 0) {
      totalArticlesFinished =  Number(userFinishedArticlesCount[0].count)
    }
    console.log('totalArticlesFinished:', totalArticlesFinished);

    // Get the total amount of courses completed by the user
    const userCompletedCoursesCountQuery = `
      SELECT
        COUNT(activities_chart.activity)
      FROM user_activities
      LEFT JOIN activities_chart
        ON user_activities.activity_id = activities_chart.id
      WHERE
        activities_chart.id = 34 AND
        user_activities.user_id = $1
      GROUP BY activities_chart.activity, activities_chart.id
      ORDER BY activities_chart.activity;
    `;
    const { rows: userCompletedCoursesCount } = await connection.query(userCompletedCoursesCountQuery, [userId])
    let totalCompletedCourses = 0
    if (userCompletedCoursesCount.length > 0) {
      totalCompletedCourses = Number(userCompletedCoursesCount[0].count)
    }
    console.log('totalCompletedCourses:', totalCompletedCourses);

    res.sendStatus(200)
  } catch (error) {
    console.log('Error inside POST achievements:', error);
  }
})

module.exports = router;