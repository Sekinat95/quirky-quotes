const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth')
//welcome page
router.get('/', (req, res) => res.render('welcome'))
//
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  res.render('dashboard', {
    user: req.user
  })
}
);

// admin page
router.get('/admin', ensureAuthenticated, (req, res) =>{
  res.render('admin')
}
);

// router.get('/quotes/all', ensureAuthenticated, (req, res) => {
//   res.render('quotes')
// })

module.exports = router;