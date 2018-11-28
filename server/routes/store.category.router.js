const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER FOR STORE CATEGORIES
router.get('/', rejectUnauthenticated, (req, res) => {
    
    let queryText = `SELECT * FROM "store_category" 
                    JOIN "store" ON store_category.store_id = store.id
                    JOIN "category" ON store_category.category_id = category.id
                    WHERE store.person_id = $1
                    AND store_category.store_id = $2
                    ORDER BY store_category.store_id, store_category.rank`;
    let queryValues = [req.user.id, req.query.id];

    pool.query(queryText, queryValues)
    .then(results => res.send(results.rows))
    .catch(error => {
        console.log('Error making SELECT for store category:', error);
        res.sendStatus(500);
    });
});

// PUT ROUTER FOR STORE CATEGORIES
router.put('/order1', rejectUnauthenticated, (req, res) => {
  
  // First update current to 0
  let queryText = `UPDATE store_category 
                  SET rank=0 
                  WHERE rank=$1 
                  AND store_id = $2`;
  let queryValues = [req.body.params.old, req.body.params.store];

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK for order1');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing UPDATE store_category query', err);
      res.sendStatus(500);
  });
  
});

router.put('/order2', rejectUnauthenticated, (req, res) => {

  let queryText = '';
  let queryValues = [];
  // Determine if moving down or up
  if (req.body.params.new > req.body.params.old) {
   queryText = `UPDATE store_category SET rank = (rank - 1) 
                    WHERE rank > $1
                    AND rank<=$2
                    AND store_id = $3`;
    queryValues = [req.body.params.old, req.body.params.new, req.body.params.store];
  } else {
    queryText = `UPDATE store_category SET rank = (rank + 1) 
                    WHERE rank >= $1 AND rank < $2
                    AND store_id = $3`;
    queryValues = [req.body.params.new, req.body.params.old, req.body.params.store];
  }

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing UPDATE store_category query', err);
      res.sendStatus(500);
  });  
});

router.put('/order3', rejectUnauthenticated, (req, res) => {
  
  // First update current to 0
  let queryText = `UPDATE store_category SET rank = $1 WHERE rank=0
                  AND store_id = $2`;
  let queryValues = [req.body.params.new, req.body.params.store];

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing UPDATE store_category query', err);
      res.sendStatus(500);
  });
});


module.exports = router;