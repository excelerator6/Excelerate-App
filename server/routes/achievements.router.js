const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// * THIS ROUTE IS SUSPICIOUS ----- MAY BE CAUSING THE TIMEOUT ERROR * \\ 

// GET all of the achievements
router.get('/', rejectUnauthenticated, async (req, res) => {

  console.log('Checkpoint achievements/ in achievements.router');
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
    console.log('End of checkpoint in achievements')
  } catch ( dbErr ) {
    console.log( 'Error in GET achievements:', dbErr );
    res.sendStatus( 500 )
  }
});

// Check if user has achievements associated with Videos Watched then post if achieved
router.post('/videosWatched', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/videosWatched in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    const {rows: userWatchedVideosCount} = await connection.query(userWatchedVideosCountQuery, [userId])
    let totalVideosWatched = 0;
    if (userWatchedVideosCount.length > 0) { userWatchedVideosCount.map(activity => {
      totalVideosWatched += Number(activity.count)
    })}

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalVideosWatched is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalVideosWatched >= 250):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 24);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 24]) : '' } break;
      case (totalVideosWatched >= 200):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 23);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 23]) : '' } break;
      case (totalVideosWatched >= 150):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 22);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 22]) : '' } break;
      case (totalVideosWatched >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 21);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 21]) : '' } break;
      case (totalVideosWatched >= 75):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 20);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 20]) : '' } break;
      case (totalVideosWatched >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 19);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 19]) : '' } break;
      case (totalVideosWatched >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 18);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 18]) : '' } break;
      case (totalVideosWatched >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 17);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 17]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/videosWatched');
  }
  catch (error) {
    console.log('Error inside POST /videosWatched:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Podcasts Finished then post if achieved
router.post('/podcastsFinished', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/podcastsFinished in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalFinishedPodcasts is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalFinishedPodcasts >= 500):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 32);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 32]) : '' } break;
      case (totalFinishedPodcasts >= 250):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 31);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 31]) : '' } break;
      case (totalFinishedPodcasts >= 200):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 30);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 30]) : '' } break;
      case (totalFinishedPodcasts >= 150):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 29);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 29]) : '' } break;
      case (totalFinishedPodcasts >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 28);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 28]) : '' } break;
      case (totalFinishedPodcasts >= 75):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 27);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 27]) : '' } break;
      case (totalFinishedPodcasts >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 26);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 26]) : '' } break;
      case (totalFinishedPodcasts >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 25);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 25]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/videosWatched');
  }
  catch (error) {
    console.log('Error inside POST /videosWatched:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Audiobooks Read then post if achieved
router.post('/audiobooksRead', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/audiobooksRead in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalFinishedAudiobooks is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalFinishedAudiobooks >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 40);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 40]) : '' } break;
      case (totalFinishedAudiobooks >= 35):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 39);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 39]) : '' } break;
      case (totalFinishedAudiobooks >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 38);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 38]) : '' } break;
      case (totalFinishedAudiobooks >= 20):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 37);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 37]) : '' } break;
      case (totalFinishedAudiobooks >= 15):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 36);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 36]) : '' } break;
      case (totalFinishedAudiobooks >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 35);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 35]) : '' } break;
      case (totalFinishedAudiobooks >= 5):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 34);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 34]) : '' } break;
      case (totalFinishedAudiobooks >= 2):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 33);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 33]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/audiobooksRead');
  }
  catch (error) {
    console.log('Error inside POST /audiobooksRead:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with BooksRead then post if achieved
router.post('/booksRead', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/booksRead in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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
      userFinishedBooksCount.map(count => {
        totalFinishedBooks += Number(count.count)
      })
    }

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalFinishedBooks is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalFinishedBooks >= 35):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 48);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 48]) : '' } break;
      case (totalFinishedBooks >= 30):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 47);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 47]) : '' } break;
      case (totalFinishedBooks >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 46);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 46]) : '' } break;
      case (totalFinishedBooks >= 20):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 45);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 45]) : '' } break;
      case (totalFinishedBooks >= 15):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 44);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 44]) : '' } break;
      case (totalFinishedBooks >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 43);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 43]) : '' } break;
      case (totalFinishedBooks >= 5):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 42);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 42]) : '' } break;
      case (totalFinishedBooks >= 2):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 41);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 41]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/booksRead checkpoint')
  }
  catch (error) {
    console.log('Error inside POST /booksRead:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Book Summaries then post if achieved
router.post('/bookSummaries', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/bookSummaries in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalFinishedBookSummaries is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalFinishedBookSummaries >= 200):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 56);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 56]) : '' } break;
      case (totalFinishedBookSummaries >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 55);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 55]) : '' } break;
      case (totalFinishedBookSummaries >= 75):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 54);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 54]) : '' } break;
      case (totalFinishedBookSummaries >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 53);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 53]) : '' } break;
      case (totalFinishedBookSummaries >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 52);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 52]) : '' } break;
      case (totalFinishedBookSummaries >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 51);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 51]) : '' } break;
      case (totalFinishedBookSummaries >= 5):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 50);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 50]) : '' } break;
      case (totalFinishedBookSummaries >= 2):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 49);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 49]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/bookSummaries checkpoint');
  }
  catch (error) {
    console.log('Error inside POST /bookSummaries:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Articles Read then post if achieved
router.post('/articlesRead', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/articlesRead in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalArticlesFinished is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalArticlesFinished >= 250):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 64);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 64]) : '' } break;
      case (totalArticlesFinished >= 200):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 63);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 63]) : '' } break;
      case (totalArticlesFinished >= 150):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 62);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 62]) : '' } break;
      case (totalArticlesFinished >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 61);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 61]) : '' } break;
      case (totalArticlesFinished >= 75):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 60);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 60]) : '' } break;
      case (totalArticlesFinished >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 59);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 59]) : '' } break;
      case (totalArticlesFinished >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 58);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 58]) : '' } break;
      case (totalArticlesFinished >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 57);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 57]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/articlesRead checkpoint');
  }
  catch (error) {
    console.log('Error inside POST /articlesRead:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Courses Completed then post if achieved
router.post('/coursesCompleted', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/coursesCompleted in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalCompletedCourses is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalCompletedCourses >= 125):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 72);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 72]) : '' } break;
      case (totalCompletedCourses >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 71);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 71]) : '' } break;
      case (totalCompletedCourses >= 75):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 70);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 70]) : '' } break;
      case (totalCompletedCourses >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 69);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 69]) : '' } break;
      case (totalCompletedCourses >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 68);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 68]) : '' } break;
      case (totalCompletedCourses >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 67);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 67]) : '' } break;
      case (totalCompletedCourses >= 5):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 66);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 66]) : '' } break;
      case (totalCompletedCourses >= 2):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 65);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 65]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('end achievements/coursesCompleted checkpoint');
  }
  catch (error) {
    console.log('Error inside POST /coursesCompleted:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Skill Levels then post if achieved
router.post('/skillLevels', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/skillLevels in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalSkillLevels is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalSkillLevels >= 500):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 16);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 16]) : '' } break;
      case (totalSkillLevels >= 200):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 15);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 15]) : '' } break;
      case (totalSkillLevels >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 14);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 14]) : '' } break;
      case (totalSkillLevels >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 13);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 13]) : '' } break;
      case (totalSkillLevels >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 12);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 12]) : '' } break;
      case (totalSkillLevels >= 10):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 11);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 11]) : '' } break;
      case (totalSkillLevels >= 5):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 10);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 10]) : '' } break;
      case (totalSkillLevels >= 1):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 9);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 9]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log("End achievements/skillLevels checkpoint");
  }
  catch (error) {
    console.log('Error inside POST /skillLevels:', error);
    res.sendStatus(500)
  }
})

// Check if user has achievements associated with Total XP then post if achieved
router.post('/totalXp', rejectUnauthenticated, async (req, res) => {
  console.log('Checkpoint achievements/totalXp in achievements.router');
  const userId = req.user.id
  try {
    const connection = await pool.connect();
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
    const {rows: userCompletedAchievements} = await connection.query(userCompletedAchievementsQuery, [userId])

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

    // Build the query for how to add a new achievement if it has been acheived
    const postNewAchievementQuery = `
      INSERT INTO user_achievements
        (user_id, achievement_id)
      VALUES
        ($1, $2)
    `;

    let completed;
    // Check if totalXpPoints is at or over an achievement threshold And the user hasn't already completed that achievement
    switch(true){
      case (totalXpPoints >= 1000):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 8);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 8]) : '' } break;
      case (totalXpPoints >= 500):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 7);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 7]) : '' } break;
      case (totalXpPoints >= 350):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 6);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 6]) : '' } break;
      case (totalXpPoints >= 250):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 5);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 5]) : '' } break;
      case (totalXpPoints >= 150):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 4);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 4]) : '' } break;
      case (totalXpPoints >= 100):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 3);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 3]) : '' } break;
      case (totalXpPoints >= 50):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 2);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 2]) : '' } break;
      case (totalXpPoints >= 25):
        completed = userCompletedAchievements.find(achieve => achieve.achievement_id === 1);
        {!completed ? await connection.query(postNewAchievementQuery, [userId, 1]) : '' } break;
      default: break;
    }
    res.sendStatus(201)
    console.log('End achievements/totalXp checkpoint');
  }
  catch (error) {
    console.log('Error inside POST /totalXp:', error);
    res.sendStatus(500)
  }
})

module.exports = router;