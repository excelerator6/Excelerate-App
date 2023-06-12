const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/getList', (req, res) => {
    pool.query('SELECT * FROM "activities_chart";')
        .then(dbRes => {
          res.send(dbRes.rows);
        }).catch(dbErr => {
          console.log("Error connecting to DB:", dbErr);
        })
});

/**
 * POST route template
 */
router.post('/log', rejectUnauthenticated, (req, res) => {
  console.log("Got our log:", req.body);
    // * before submitting this info to the database, we gotta get our skills and activities to the client side.
    // * Currently, we have placeholder dummy data using Currency symbols for our activities + skills,
    // * not fit for sullying our DB with.
  res.sendStatus(201);
});

module.exports = router;