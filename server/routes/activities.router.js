const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/getList', rejectUnauthenticated, (req, res) => {
    pool.query('SELECT * FROM "activities_chart" ORDER BY id;')
        .then(dbRes => {
          console.log(dbRes.rows);
          res.send(dbRes.rows);
        }).catch(dbErr => {
          console.log("Error connecting to DB:", dbErr);
        })
});

// Route for logging new activity
// * WILL WANT TO REFACTOR USING ASYNC / AWAIT
router.post('/log', rejectUnauthenticated, (req, res) => {
  // console.log("Got our log:", req.body);
  const date = req.body.date; // * we need to format this date differently, don't we?
  const activity = req.body.activity;
  const source = req.body.source;
  const takeaway = req.body.takeaway;
  const userID = req.user.id;

  // conditional to check whether or not the skill the user is levelling is an enterprise skill or personal user skill
  if(req.body.enterpriseId){
    // conditional to check whether or not the user supplied a takeaway
    if(takeaway != undefined){
        // this is if the user chose an enterprise skill + included a takeaway
        let sqlText = `
          INSERT INTO "user_activities" (date_completed, skills_enterprise_id, user_id, activity_id, source, key_takeaways)
          VALUES ($1, $2, $3, $4, $5, $6);
        `;
        let sqlValues = [date, req.body.enterpriseId, userID, activity, source, takeaway];
        pool.query(sqlText, sqlValues)
            .then(dbRes => {
              // console.log("Successfully added activity to the DB:", dbRes);
              res.sendStatus(201)
            }).catch(dbErr => {
              console.log("Error connecting to DB in activites.router /log:", dbErr);
              res.sendStatus(500);
            })
    } else if(takeaway == undefined){
        let sqlText = `
        INSERT INTO "user_activities" (date_completed, skills_enterprise_id, user_id, activity_id, source)
        VALUES ($1, $2, $3, $4, $5);
        `;
        let sqlValues = [date, req.body.enterpriseId, userID, activity, source];
        pool.query(sqlText, sqlValues)
            .then(dbRes => {
              // console.log("Successfully added activity to the DB:", dbRes);
              res.sendStatus(201)
            }).catch(dbErr => {
              console.log("Error connecting to DB in activites.router /log:", dbErr);
              res.sendStatus(500);
            })
    }
  } else if (req.body.skillUserId) {
    if(takeaway != undefined){
        let sqlText = `
        INSERT INTO "user_activities" (date_completed, skills_user_id, user_id, activity_id, source, key_takeaways)
        VALUES ($1, $2, $3, $4, $5, $6);
        `;
        let sqlValues = [date, req.body.skillUserId, userID, activity, source, takeaway];
        pool.query(sqlText, sqlValues)
            .then(dbRes => {
              // console.log("Successfully added activity to the DB:", dbRes);
              res.sendStatus(201)
            }).catch(dbErr => {
              console.log("Error connecting to DB in activites.router /log:", dbErr);
              res.sendStatus(500);
            })
    } else if(takeaway == undefined){
        let sqlText = `
        INSERT INTO "user_activities" (date_completed, skills_user_id, user_id, activity_id, source)
        VALUES ($1, $2, $3, $4, $5);
        `;
        let sqlValues = [date, req.body.skillUserId, userID, activity, source];
        pool.query(sqlText, sqlValues)
            .then(dbRes => {
              // console.log("Successfully added activity to the DB:", dbRes);
              res.sendStatus(201)
            }).catch(dbErr => {
              console.log("Error connecting to DB in activites.router /log:", dbErr);
              res.sendStatus(500);
            })
    }
  }
});

module.exports = router;