const express = require( 'express');
const db = require('../models');
const localAuth = require('../services/auth')
const middleware = require('../middleware')
const router = express.Router();

/* GET index page. */
router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/', middleware.requireAuth,(req, res) => {
  res.render('index', {
    title: 'BitCoin'
  });
});

router.get('/logout', (req,res) => {
  req.logout()
  res.render('login')
})

router.post('/login', localAuth)

router.get('/signup', (req, res) => {
  res.render('signup')
})


router.post('/signup', (req, res) => {
  db.User.create({name: req.body.name, password:req.body.password, email:req.body.email})
  .then(() => res.redirect(200, 'login'))
  .catch(err => res.render('signup', {
    err: 'Sorry something went wrong, Try Again'
  }))
})


module.exports = router;
