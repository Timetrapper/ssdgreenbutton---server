var express = require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var mongojs = require("mongojs");
var config = require("../config");
var db = mongojs(config.database, ['users']);

// get register route
router.get('/register', function(req, res) {
    res.render('register');
});

// get login route
router.get('/login', function(req, res) {
    res.render('login');
});

// post register route
router.post('/register', function(req, res) {
    var email = req.body.email;
    
    var password = req.body.password;
    var password2 = req.body.password2;

    var role = "user";
    var creationdate;

    // validation
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        })
    } else {
        var newUser = new User({
            email: email,
            password: password,
            role: role,
            creationdate: new Date()
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success-msg', "You are registered and can now login.");
        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

router.post('/login', 
  passport.authenticate('local',{
      successRedirect: '/', 
      failureRedirect: '/users/login',
      failureFlash: true
  }),
  function(req, res) {
      res.redirect('/');
  }
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function (id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
  
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/users/login');
});

router.get("/users", (req, res, next) => {
    db.users.find( (err, data) => {
        if (err)
            res.send(err);
        
        res.json(data);
    })
});
router.get("/users/:id", (req, res, next) => {
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

module.exports = router;