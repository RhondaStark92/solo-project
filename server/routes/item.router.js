const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER TO RETRIEVE ITEMS AVAILABLE
router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('query.id', req.query.id);
      
  pool.query(`SELECT * FROM item
              WHERE item.person_id = ${req.user.id}
              ORDER BY name`)
      .then(results => res.send(results.rows))
      .catch(error => {
          console.log('Error making SELECT for item:', error);
          res.sendStatus(500);
      });
});

// POST ROUTER TO ADD NEW ITEM
router.post('/', rejectUnauthenticated, (req, res) => {

  const newItem = req.body;

  const queryText = `INSERT INTO item 
  ("category_id", "name", "brand_name", "person_id") 
    VALUES ($1, $2, $3, $4)`;
  const queryValues = [
    newItem.category_id,
    newItem.name,
    newItem.brand_name,
    req.user.id,
  ];

  // console.log('sql query for new items for new user', queryText);
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing INSERT item query', err);
      res.sendStatus(500);
    });
});

// GET ROUTER FOR ALL ITEMS ON THE SHOPPING LIST
router.get('/list', rejectUnauthenticated, (req, res) => {
    // console.log('query.id', req.query.id);

    pool.query(`SELECT category.id, category.name as category,
                item.id as item_id, item.name as item, item.brand_name, item.category_id,
                shopping_list.quantity, shopping_list.id as list_id 
                FROM item JOIN category ON item.category_id = category.id
                FULL OUTER JOIN shopping_list ON shopping_list.item_id = item.id
                WHERE category.person_id = ${req.user.id}
                ORDER BY category.name, item`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for item:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE item SET name=$2, brand_name=$3 WHERE id=$1';
    console.log('update SQL', queryText, req.body);
    pool.query(queryText, [req.body.id, req.body.name, req.body.brand_name])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE item query', err);
        res.sendStatus(500);
      });            
});

// DELETE ROUTER FOR ITEM
router.delete('/', rejectUnauthenticated, (req, res) => {
  // console.log('in delete on server', req.query.id);
  const queryText = 'DELETE FROM item WHERE id=$1';
  pool.query(queryText, [req.query.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE item query', err);
      res.sendStatus(500);
    });
});

module.exports = router;