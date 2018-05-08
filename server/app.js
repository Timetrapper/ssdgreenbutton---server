var bodyParser = require('body-parser');
var config = require('./config');
var cookieParser = require('cookie-parser');
const espiParser = require('espi-parser');
const util = require('util');
var exphbs = require('express-handlebars');
var express = require("express");
var flash = require('connect-flash');
var moment = require('moment'); //npm install moment
var http = require("http");
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var session = require('express-session');
var handleXMLToJON = require('./routes/api/xml');
var connectToDB = require('./_helpers/mongoconnect/mongoconnect');
var useExpressValidator = require('./config/expressValidator');
// Security
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Routes
var routes = require('./routes/');
var tokensApi = require('./routes/api/tokens');
var users = require('./routes/users');
var index = require('./routes/index');
var dataApi = require('./routes/api/data');

// Initialize app
var app = express();

connectToDB.CONNECTTODB();

// Parsers
app.use(cookieParser());

// View Engine - Express Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'hokuspokus',
    saveUnititialized: true,
    resave: true
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// bring in passport strategy we defined
require('./config/passport')(passport);

useExpressValidator.USEVALIDATOR();

// connect flash middleware
app.use(flash());

// global vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// enable CORS
app.use('/', routes);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Call XML Request 
// TODO: Put in Function 
handleXMLToJON.XMLREQUEST();

app.use('/', routes);
//app.use("/", daily);
app.use('/users', users);
app.use('/token', tokensApi);
app.use('/', index);

// set passport
app.set('port', config.port);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});

module.exports = app;
