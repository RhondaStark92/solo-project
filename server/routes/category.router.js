const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// POST ROUTER TO ADD A NEW CATEGORY
router.post('/', rejectUnauthenticated, (req, res) => {
  
  const newCategory = req.body;

  const queryText = `INSERT INTO category 
    ("name", "person_id")
    VALUES ($1, $2)`;
  const queryValues = [
    newCategory.name,
    req.user.id,
  ];

  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing INSERT new category query', err);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM category
                WHERE category.person_id = ${req.user.id}
                ORDER BY name`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for category:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE category SET name=$2 WHERE id=$1';
    pool.query(queryText, [req.body.id, req.body.name])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE category query', err);
        res.sendStatus(500);
      });
});

// DELETE ROUTER FOR CATEGORY
router.delete('/', rejectUnauthenticated, (req, res) => {
  // console.log('in delete on server', req.query.id);
  const queryText = 'DELETE FROM category WHERE id=$1';
  pool.query(queryText, [req.query.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE category query', err);
      res.sendStatus(500);
    });
});

module.exports = router;