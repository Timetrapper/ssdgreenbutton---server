var bodyParser = require('body-parser');
var config = require('./config');
const espiParser = require('espi-parser');
const util = require('util');
var exphbs = require('express-handlebars');
var express = require("express");
var moment = require('moment'); //npm install moment
var http = require("http");
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
//Custom Modules 
var handleXMLToJON = require('./routes/api/xml');
var connectToDB = require('./_helpers/mongoconnect/mongoconnect');
var useExpressValidator = require('./config/expressValidator');
var appSettings = require('./config/app');
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

appSettings.APPSETTINGS();
connectToDB.CONNECTTODB();

// Parsers

// app.use(cookieParser());

// View Engine - Express Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// BodyParser middleware
/*
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
*/
// bring in passport strategy we defined
//require('./config/passport')(passport);

useExpressValidator.USEVALIDATOR();

/*

// Call XML Request 
// TODO: Put in Function 
handleXMLToJON.XMLREQUEST();
*/

// set passport
app.set('port', config.port);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});

module.exports = app;
