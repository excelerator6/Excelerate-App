const express = require('express');
const pool = require('../modules/pool');
const { default: logger } = require('redux-logger');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/getSkills', rejectUnauthenticated, async (req, res) => {
  // GET route code here

  const userID = req.user.id;
  try {
    // aggregate array of both skill tables
    let arr = [];

    // get the general skills
    const response = await pool.query('SELECT skills_enterprise.id AS enterprise_id, skill_name FROM "skills_enterprise";');

    // get the user's specific skills
    const response2 = await pool.query(`SELECT skills_user.id AS user_skill_id, skill_name FROM "skills_user" WHERE skills_user.user_id = $1;`, [userID]);

    // push both table responses into singular array, then flatten that array to send client-side
    arr.push(response.rows, response2.rows);
    arr = arr.flat();
    res.send(arr)
  } catch (error) {
    console.log("Error connecting to DB in getSkills:", error);
  }
});

// POST route code here
router.post('/logNewSkill', rejectUnauthenticated, (req, res) => {

  const newSkill = req.body.skill;
  const userID = req.user.id;

  //updated sql query to check that we dont add duplicate skills to our DB
  let sqlText = `
    INSERT INTO skills_user (skill_name, user_id) 
    SELECT $1, $2 
    WHERE NOT EXISTS (
      SELECT NULL FROM skills_user 
      WHERE LOWER(skills_user.skill_name) = LOWER('$1') 
        AND skills_user.user_id = $2
    );
  `;
  let sqlValues = [newSkill, userID];
  pool.query(sqlText, sqlValues)
    .then(dbRes => {
      res.sendStatus(201)
    }).catch(dbErr => {
      console.log("Error connecting to DB in skills.router /logNewSkill", dbErr);
      res.sendStatus(500);
    })

});


router.delete('/deleteSkill/:skill', rejectUnauthenticated, async (req, res) => {
  console.log("Here's the skill we're working with:", req.params.skill);
});

module.exports = router;
