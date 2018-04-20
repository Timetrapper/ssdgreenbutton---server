var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



// get register route
router.get('/register', function(req, res) {
    res.render('register');
});

// get login route
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/register', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    //var username = req.body.username; 
    var password = req.body.password;
    var street = req.body.street;
    var city = req.body.city;
    var province = req.body.province;
    var postal = req.body.postal;
    var country = req.body.country;
    //var password2 = req.body.password2;

    // validation: Re-enable after!
    //req.checkBody('name', 'Name is required').notEmpty();
   // req.checkBody('email', 'Email is required').notEmpty();
    //req.checkBody('email', 'Email is not valid').isEmail();
    //req.checkBody('username', 'Username is required').notEmpty();
    //req.checkBody('password', 'Password is required').notEmpty();
   // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        })
    } else {
        var newUser = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            province: province,
            postal: postal,
            country: country 
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

// THIS IS ONLY NEEDED FOR THE NODE SIDE
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


module.exports = router; 
