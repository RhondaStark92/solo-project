const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// POST ROUTER TO AUTOMATICALLY ADD BASE CATEGORIES 
// TO CATEGORY TABLE FOR NEWLY REGISTERED USERS
router.post('/user', rejectUnauthenticated, (req, res) => {
    console.log('user', req.user.id);
    
    const newStore = req.body;
    const queryText = `INSERT INTO category 
                      ("name", "person_id") SELECT 
                      ("name", ${req.user.id})
                      FROM base_category`;
    console.log('sql query for new categories for new user', queryText);
    
    pool.query(queryText)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing INSERT category for user query', err);
        res.sendStatus(500);
      });
});

router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('query.id', req.query.id);
        
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