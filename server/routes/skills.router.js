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

// * THIS ROUTE IS SUSPICIOUS IN REQUESTS TIMING OUT * \\
router.get('/getSkills', rejectUnauthenticated, async (req, res) => {
  console.log("Checkpoint skills/getSkills in skills.router");
  // GET route code here
  const userID = req.user.id;
  try {
    // aggregate array of both skill tables
    let arr = [];

    // get the general skills\
    const deletedSkills = await pool.query(`SELECT skill_id FROM "deleted_skills" WHERE user_id = ${userID}`);

    // It would probably be quicker to do a left or right join here with the deleted_skills table, excluding those from the
    // returned rows.
    const response = await pool.query('SELECT skills_enterprise.id AS enterprise_id, skill_name FROM "skills_enterprise";');


    // this is the function that filters our enterprise_skills array against our deleted_skills table --- Any successful comparison of ID's get's removed from the array, not to appear on the DOM.
    const enterpriseSkills = response.rows.filter((skill) => {
      // this vvvvv is to extract JUST the ID's of the deleted skills.
      const deletedSkillValues = deletedSkills.rows.map(skill => Number(skill.skill_id))
      return deletedSkillValues.indexOf(skill.enterprise_id) < 0;
    })


    // get the user's specific skills
    const response2 = await pool.query(`SELECT skills_user.id AS user_skill_id, skill_name FROM "skills_user" WHERE skills_user.user_id = $1;`, [userID]);

    // push both table responses into singular array, then flatten that array to send client-side
    arr.push(enterpriseSkills, response2.rows);
    arr = arr.flat();
    console.log("End checkpoint skills/getSkills in skills.router");
    res.send(arr);
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


// Add enterprise skills that users delete to a list, linking that user with that deleted enterprise skill. 
// Then, when we retrieve the list of skills for a user, we will check the deleted_skills list and omit
// any "deleted" enterprise skill from being displayed for that user.
router.post('/deleteEnterpriseSkill/', rejectUnauthenticated, async (req, res) => {
  const skillID = req.body.enterprise_id;
  const userID = req.user.id;

  let sqlText = `
    INSERT INTO "deleted_skills" (user_id, skill_id)
      VALUES ($1, $2);
  `;

  pool.query(sqlText, [userID, skillID])
    .then(dbRes => {
      console.log("Successful addition to deleted skills table:", dbRes);
      res.sendStatus(200)
    }).catch(dbErr => {
      console.log('Error connecting to DB in skills.router /deleteEnterpriseSkill', dbErr)
      res.sendStatus(500)
    })
});

router.delete('/deleteUserSkill/:skill', rejectUnauthenticated, async (req, res) => {
  console.log("Here's the skill we're working with in user:", req.params.skill);
  const skillID = req.params.skill;

  let sqlText = `
    DELETE FROM "skills_user"
      WHERE "id" = $1;
  `;

  pool.query(sqlText, [skillID])
    .then(dbRes => {
      res.sendStatus(200)
    }).catch(dbErr => {
      console.log('Error connecting to DB in skills.router /deleteEnterpriseSkill', dbErr)
      res.sendStatus(500)
    })
});

module.exports = router;
