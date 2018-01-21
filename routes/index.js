const express = require( 'express');

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'BitCoin'
  });
});

module.exports = router;
