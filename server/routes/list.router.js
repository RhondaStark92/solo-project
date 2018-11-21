const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlText = '';
    console.log('query.id', req.query.id);
    
    // if no store is selected just base the query
    // off of the shopping list and ordered by the found flag
    if (req.query.id == 0) {
        sqlText = `SELECT shopping_list.*, item.name as item, item.brand_name 
        FROM "shopping_list" JOIN "item" ON shopping_list.item_id = item.id
        WHERE shopping_list.person_id = ${req.user.id}
        ORDER BY shopping_list.found`
    // store is selected so base the query off the store
    // category and ordered by the category order for the store
    } else {
        sqlText = `SELECT shopping_list.*, item.name as item, item.brand_name 
        FROM "shopping_list" JOIN "item" ON shopping_list.item_id = item.id
        JOIN "store_category" ON item.category_id = store_category.category_id
        WHERE shopping_list.person_id = ${req.user.id}
        AND store_category.store_id = ${req.query.id}
        ORDER BY shopping_list.found, store_category.order`
    }
    
    console.log('sqlText', sqlText);
    
    pool.query(sqlText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for shopping list:', error);
            res.sendStatus(500);
        });
});

router.put('/found', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE shopping_list SET found=$2 WHERE id=$1';
    pool.query(queryText, [req.body.id, req.body.found])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE shopping_list query', err);
        res.sendStatus(500);
      });
});

module.exports = router;