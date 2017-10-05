const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');

const response = require('../../helpers/response');
const User = require('../../models/User')

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(user)
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: 'Your credentials are wrong or you not exist' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return response.data(req, res, req.user.asData());
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {



  const {
    username,
    email,
    password
  } = req.body;

   if (!username || !password || !email) {
    res.json({ message: 'Provide username password email' });
    return;
  }

  // if (!username) {
  //   return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  // }
  // if (!password) {
  //   return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  // }
  // if (!email) {
  //   return response.unprocessable(req, res, 'Missing mandatory field "Email".');
  // }

  User.findOne({
    username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return response.data(req, res, newUser.asData());
      });
    });
  });
});

router.post('/logout', (req, res) => {
  req.logout();
  return response.ok(req, res);
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    return response.data(req, res, user.asData());
  }

  return response.notFound(req, res);
});

module.exports = router;