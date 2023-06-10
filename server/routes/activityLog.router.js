const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/', (req, res) => {
//   // GET route code here
// });

/**
 * POST route template
 */
router.post('/log', (req, res) => {
  // POST route code here
  console.log("Got our log:", req.body);
  res.sendStatus(201);
});

module.exports = router;