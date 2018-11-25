const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER FOR STORES
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('req.user:', req.user);
    
    pool.query(`SELECT * FROM "store" 
                ORDER BY name`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for store:', error);
            res.sendStatus(500);
        });
});

// POST ROUTER FOR NEW STORE
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('user', req.user.id);
    
    const newStore = req.body;
    const queryText = `INSERT INTO store 
                      ("name", "location", "person_id")
                      VALUES ($1, $2, $3)`;
    const queryValues = [
        newStore.name,
        newStore.location,
        req.user.id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing INSERT store query', err);
        res.sendStatus(500);
      });
});

// DELETE ROUTER FOR STORE
router.delete('/', rejectUnauthenticated, (req, res) => {
    console.log('in delete on server', req.query.id);
    const queryText = 'DELETE FROM store WHERE id=$1';
    pool.query(queryText, [req.query.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETE store query', err);
        res.sendStatus(500);
      });
});

module.exports = router;