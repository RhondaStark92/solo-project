const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    
    pool.query(`SELECT shopping_list.*, item.name as item, item.brand_name 
                FROM "shopping_list" JOIN "item" ON shopping_list.item_id = item.id
                WHERE shopping_list.person_id = ${req.user.id}
                ORDER BY shopping_list.found`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for shopping list:', error);
            res.sendStatus(500);
        });
});

module.exports = router;