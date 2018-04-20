var express = require('express');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config/');
var User = require('../../models/user');

// Register new users
apiRoutes.post('/register', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter email & password to register.'
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            street: req.body.street,
            city: req.body.city,
            province: req.body.province,
            postal: req.body.postal,
            country: req.body.country 
        });

	 // Attempt to save the new user
        User.createUser(newUser, function(err, user) {
            if (err) {
                return res.json({
                    success: false,
                    message: "Email already exists."
                });
            }
            res.json({
                success: true,
                message: 'Successfully created new user.'
            })
        });
    }
});

// authenticate user and obtain token
apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ 
                success: false,
                message: 'Authentication failed. User not found'
            });
        } else {
		 // check that password matches
            User.comparePassword(req.body.password, user.password, function(err, isMatch) {
                if (isMatch && !err && user.role == "member") {
                    // create token
                    var token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 10080 // week in seconds
                    });
                    res.json({ role: 'member', success: true, token: 'JWT ' + token });
                } else if (isMatch && !err && user.role == "admin") {
                    // create token
                    var token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 10080 // week in seconds
                    });
                    res.json({ role: 'admin', success: true, token: 'JWT ' + token });
                } else {
                    res.send( {
                        success: false,
                        message: 'Authentication failed. Invalid password'
                    });
                }
            });
        }
    });
});

module.exports = apiRoutes;
