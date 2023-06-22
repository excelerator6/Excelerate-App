const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//GET Router
router.get("/", (req, res) => {
  const query = `SELECT * FROM avatars;`;

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: GET character router ", err);
      res.sendStatus(500);
    });
});

//PUT route
router.put("/", (req, res) => {
  const avatarNewName = req.body.avatarNewName;
  const userID = req.user.id;

  const sqlQuery = `
        UPDATE "user"
        SET "user_avatar_path" = $1
        WHERE "id" = $2;
    `;

  const sqlValues = [avatarNewName, userID];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Router PUT FAIL!: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
