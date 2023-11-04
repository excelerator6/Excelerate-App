const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.get('/getList', rejectUnauthenticated, (req, res) => {
  console.log("Checkpoint activities/getList in activities.router");
    pool.query('SELECT * FROM "activities_chart" ORDER BY id;')
        .then(dbRes => {
          res.send(dbRes.rows);
        }).catch(dbErr => {
          console.log("Error connecting to DB:", dbErr);
        })
});


// *THIS MIGHT BE WHERE THE PROBLEM IS*\\
// * MIGHT BE NICE TO MAKE IT ASYNCHRONOUS WITH TRY/CATCH * \\

// Route for logging new activity
router.post('/log', rejectUnauthenticated, (req, res) => {
  console.log("Checkpoint activities/log in activities.router");
  const date = req.body.date;
  const activity = req.body.activity;
  const source = req.body.source;
  const takeaway = req.body.takeaway;
  const userID = req.user.id;
  
  
  
  // ********* Something is disrupting the call between the logActivity saga in activites.saga
  // ********* and this POST route, since it doesn't get hit after a few calls.

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
              res.sendStatus(201)
            }).catch(dbErr => {
              console.log("Error connecting to DB in activites.router /log:", dbErr);
              res.sendStatus(500);
            })
    }
  }
});

module.exports = router;