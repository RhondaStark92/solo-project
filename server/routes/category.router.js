const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlText = '';
    console.log('query.id', req.query.id);
        
    pool.query(`SELECT * FROM category
                WHERE category.person_id = ${req.user.id}`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for category:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE category SET name=$2 WHERE id=$1';
    pool.query(queryText, [req.body.id, req.body])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE category query', err);
        res.sendStatus(500);
      });
});

module.exports = router;