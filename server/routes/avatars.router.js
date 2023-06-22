const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET Router
router.get('/', (req, res) => {
    const query = `SELECT * FROM avatars;`;
    
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: GET character router ', err);
        res.sendStatus(500)
      })
  });

  //PUT route
router.put('/:id', (req, res) => {

    const avatarsNewName = req.body.avatar_name;
  
    
    const sqlQuery = `
    UPDATE "user"
        SET 
        "user.id" = $1
        AND
        "user_avatar_path" = $2,
        WHERE "id" = $3
        `;
        
    const sqlValues = [avatarsNewName]
      
  
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) =>{ 
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('Router PUT FAIL!: ', err);
      res.sendStatus(500);
    });
  })

  module.exports = router;