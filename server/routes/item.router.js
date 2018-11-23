const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('query.id', req.query.id);

    pool.query(`SELECT category.id, category.name as category,
                item.id as item_id, item.name as item 
                FROM item JOIN category ON item.category_id = category.id
                WHERE category.person_id = ${req.user.id}
                ORDER BY category.name, item`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for item:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE item SET name=$2 WHERE id=$1';
    pool.query(queryText, [req.body.id, req.body])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE item query', err);
        res.sendStatus(500);
      });            
});

module.exports = router;