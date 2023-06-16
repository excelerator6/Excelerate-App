const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  // const sqlQuery = `
  //   SELECT DATE(date_completed), COUNT(1) AS count
  //   FROM user_activities
  //   WHERE user_id = $1
  //   GROUP BY DATE(date_completed);
  // `;

  pool
    .query(sqlQuery, [userId])
    .then(dbRes => {
      const achievements = dbRes.rows
      res.send(achievements);
    }).catch(dbErr => {
      console.log("Error connecting to DB within GET achievements:", dbErr);
      res.sendStatus(500);
    })
});

module.exports = router;