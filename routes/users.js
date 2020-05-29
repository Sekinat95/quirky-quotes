const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
const User = require('../models/user');
//login
router.get('/login', (req, res) => res.render('login'));
//register
router.get('/register', (req, res) => res.render('register'));

//register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2} = req.body;
  let errors = [];

  //check passwords match
  if(password!== password2) {
    errors.push({msg: 'passwords donot macth'})
  }
  //check passowrd length
  if(password.length < 6) {
    errors.push({msg: 'password must be at least 6 characters'})
  }
  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    //validation pass
    User.findOne({ email: email })
      .then(user => {
        if(user) {
          //user exits
          errors.push({ msg: 'email is already registered'})
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })

        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          //hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            //set password to hashed
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'you are now registered and logged in')
                res.redirect('/dashboard')
              })
              .catch(err => console.log(err))
          }))
        }
      });
  }
})


//login handle
router.post('/login', (req, res, next) => {
  if(req.body.email === 'admin@admin' && req.body.password==='adminsek021295'){
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/dashboard',
      failureFlash: true
    })(req, res, next);
  } else {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}
})

//logouts handle
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('sucess_msg', 'you are loggedout');
  res.redirect('/users/login')
})

module.exports = router;