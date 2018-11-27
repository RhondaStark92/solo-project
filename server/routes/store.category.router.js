const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER FOR STORE CATEGORIES
router.get('/', rejectUnauthenticated, (req, res) => {

    pool.query(`SELECT * FROM "store_category" 
                JOIN "store" ON store_category.store_id = store.id
                JOIN "category" ON store_category.category_id = category.id
                WHERE store.person_id = ${req.user.id}
                ORDER BY store_category.store_id, store_category.rank`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for store category:', error);
            res.sendStatus(500);
        });
});

// PUT ROUTER FOR STORE CATEGORIES
router.put('/order1', (req, res) => {

  console.log('in router put order 1', req.body.params);
  
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

router.put('/order2', (req, res) => {

  console.log('in router put order 2', req.body.params);
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

router.put('/order3', (req, res) => {

  console.log('in router put order 3', req.body);
  
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