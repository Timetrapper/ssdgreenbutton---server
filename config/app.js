// Express 
var express = require("express");
var bodyParser = require('body-parser');
var config = require('../config');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var flash = require('connect-flash');
var app = express();

// Security
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Routes
var routes = require('../routes/');
var tokensApi = require('../routes/api/tokens');
var users = require('../routes/users');
var index = require('../routes/index');
var dataApi = require('../routes/api/data');


app.use(cookieParser());

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// set static folder
//app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'hokuspokus',
    saveUnititialized: true,
    resave: true
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// connect flash middleware
app.use(flash());

// enable CORS
app.use('/', routes);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/token', tokensApi);



