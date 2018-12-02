const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER FOR SHOPPING LIST ITEMS
router.get('/', rejectUnauthenticated, (req, res) => {

    let sqlText = '';
    // if no store is selected just base the query
    // off of the shopping list and ordered by the found flag
    // and category id
    // console.log('in fetch list', req.user.id, req.query.id);
    if (req.query.id == 0) {
        sqlText = `SELECT shopping_list.*, item.name as item, item.brand_name 
        FROM "shopping_list" JOIN "item" ON shopping_list.item_id = item.id
        WHERE shopping_list.person_id = ${req.user.id}
        ORDER BY shopping_list.found, item.category_id, item`
    } else {
    // store is selected so base the query off the store
    // category and ordered by the category order for the store
    sqlText = `SELECT shopping_list.*, item.name as item, item.brand_name 
        FROM "shopping_list" JOIN "item" ON shopping_list.item_id = item.id
        JOIN "store_category" ON item.category_id = store_category.category_id
        WHERE shopping_list.person_id = ${req.user.id}
        AND store_category.store_id = ${req.query.id}
        ORDER BY shopping_list.found, store_category.rank, item`
    }
    
    pool.query(sqlText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for shopping list:', error);
            res.sendStatus(500);
        });
});

// POST ROUTER FOR NEW SHOPPING LIST ITEM
router.post('/', rejectUnauthenticated, (req, res) => {
    const newListItem = req.body;
    const queryText = `INSERT INTO shopping_list 
                      ("item_id", "quantity", "person_id")
                      VALUES ($1, $2, $3)`;
    const queryValues = [
        newListItem.item_id,
        newListItem.quantity,
        req.user.id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing INSERT shopping_list query', err);
        res.sendStatus(500);
      });
});

// PUT ROUTER TO UPDATE FOUND FLAG ON SHOPPING LIST ITEM
router.put('/found', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE shopping_list SET found=$2 WHERE id=$1';
    pool.query(queryText, [req.body.id, req.body.found])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE shopping_list query', err);
        res.sendStatus(500);
      });
});

// PUT ROUTER TO UPDATE QUANTITY ON SHOPPING LIST ITEM
router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE shopping_list SET quantity=$2 WHERE id=$1';
    // console.log('update query', req.body.list_id, req.body.quantity);
    pool.query(queryText, [req.body.list_id, req.body.quantity])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE shopping_list quantity query', err);
        res.sendStatus(500);
      });
});

// DELETE ROUTER FOR SHOPPING LIST ITEM
router.delete('/', rejectUnauthenticated, (req, res) => {
    // console.log('in delete on server', req.query.id);
    const queryText = 'DELETE FROM shopping_list WHERE id=$1';
    pool.query(queryText, [req.query.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETE shopping_list query', err);
        res.sendStatus(500);
      });
});

// DELETE ROUTER TO CLEAR SHOPPING LIST
router.delete('/clear', rejectUnauthenticated, (req, res) => {
    // console.log('in delete on server', req.user.id);
    const queryText = 'DELETE FROM shopping_list WHERE person_id=$1';
    pool.query(queryText, [req.user.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETE all shopping_list query', err);
        res.sendStatus(500);
      });
});


module.exports = router;