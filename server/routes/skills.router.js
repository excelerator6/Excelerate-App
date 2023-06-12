const express = require('express');
const pool = require('../modules/pool');
const { default: logger } = require('redux-logger');
const router = express.Router();

/**
 * GET route template
 */
router.get('/getSkills', async (req, res) => {
  // GET route code here
  const userID = req.user.id;
  try {
    // aggregate array of both skill tables
    let arr = [];

    // get the general skills
    // * Do we need to rename the skills.id for both tables in order to differentiate them from the other table?
    const response = await pool.query('SELECT skills_enterprise.id AS enterprise_id, skill_name FROM "skills_enterprise";');

    // get the user's specific skills
    const response2 = await pool.query(`SELECT skills_user.id AS user_skill_id, skill_name FROM "skills_user" WHERE skills_user.user_id = $1;`, [userID]);

    // push both table responses into singular array, then flatten that array to send client-side
    arr.push(response.rows, response2.rows);
    arr = arr.flat();
    console.log(arr);
    res.send(arr)
  } catch (error) {
    console.log("Error connecting to DB in getSkills:", error);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
