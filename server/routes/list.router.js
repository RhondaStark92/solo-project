const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    pool.query(`SELECT * FROM "shopping_list" WHERE person_id = ${req.user.id}`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for shopping list:', error);
            res.sendStatus(500);
        });
});

module.exports = router;