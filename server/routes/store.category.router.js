const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER FOR STORE CATEGORIES
router.get('/', rejectUnauthenticated, (req, res) => {
    
//   select * from store_category
// join store on store_category.store_id = store.id
// join category on store_category.category_id = category.id
// where store.person_id = 1
    pool.query(`SELECT * FROM "store_category" 
                JOIN "store" ON store_category.store_id = store.id
                JOIN "category" ON store_category.category_id = category.id
                WHERE store.person_id = ${req.user.id}
                ORDER BY store_id, store_category.rank`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for store category:', error);
            res.sendStatus(500);
        });
});
router.put('/order1', (req, res) => {

  console.log('in router put order 1', req.body.params);
  
  // First update current to 0
  let queryText = `UPDATE plant SET rank=0 WHERE rank=$1`;
  let queryValues = [req.body.params.old];

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK for order1');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT plant query', err);
      res.sendStatus(500);
  });
  
});

router.put('/order2', (req, res) => {

  console.log('in router put order 2', req.body.params);
  let queryText = '';
  let queryValues = [];
  // Determine if moving down or up
  if (req.body.params.new > req.body.params.old) {
   queryText = `UPDATE plant SET rank = (rank - 1) 
                    WHERE rank > $1
                    AND rank<=$2`;
    queryValues = [req.body.params.old, req.body.params.new];
  } else {
    queryText = `UPDATE plant SET rank = (rank + 1) 
                    WHERE rank >= $1 AND rank < $2`;
    queryValues = [req.body.params.new, req.body.params.old];
  }

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT plant query', err);
      res.sendStatus(500);
  });  
});

router.put('/order3', (req, res) => {

  console.log('in router put order 3', req.body);
  
  // First update current to 0
  let queryText = `UPDATE plant SET rank = $1 WHERE rank=0`;
  let queryValues = [req.body.params.new];

  pool.query(queryText, queryValues)
    .then(() => { 
      console.log('update OK');
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT plant query', err);
      res.sendStatus(500);
  });
});


module.exports = router;