var config = require('./config');
var exphbs = require('express-handlebars');
var express = require("express");
var moment = require('moment');
var http = require("http");
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
//Custom Modules 
var handleXMLToJSON = require('./routes/api/xml');
var connectToDB = require('./_helpers/mongoconnect/mongoconnect');
var useExpressValidator = require('./config/expressValidator');
var appSettings = require('./config/app');
// Security
var passport = require('passport');
// Routes
var routes = require('./routes/');
var tokensApi = require('./routes/api/tokens');
var users = require('./routes/users');
var index = require('./routes/index');
var dataApi = require('./routes/api/data');
// Initialize app
var app = express();
// Application Settings & Middleware
// Connection to Mongo & Mongoose
connectToDB.CONNECTTODB();
// Set Express Validation
useExpressValidator.USEVALIDATOR();
// Express 
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var flash = require('connect-flash');
var app = express();

app.use(cookieParser());

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


// Call XML Parse Request

// handleXMLToJON.XMLREQUEST();

// View Engine - Express Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
// Set Passport
app.set('port', config.port);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});

module.exports = app;
