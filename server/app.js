var bodyParser = require('body-parser');
var config = require('./config');
var cookieParser = require('cookie-parser');
const espiParser = require('espi-parser');
const util = require('util');
var exphbs = require('express-handlebars');
var express = require("express");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var moment = require('moment'); //npm install moment
var http = require("http");
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');

// Initialize app
var app = express();

// Models
var Account = require('./models/account');

// Mlabs
var mongoose = require('mongoose');
mongoose.connect(config.database_mlb).then(function(){
    console.log("successfully connected to db");
    console.log("database name: " + mongoose.connection.db.databaseName);
}, function(){
    console.log("failed to connected to db");
}); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Security
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Routes
var routes = require('./routes/');
var tokensApi = require('./routes/api/tokens');
var users = require('./routes/users');
var index = require('./routes/index');
var dataApi = require('./routes/api/data');
var handleXMLToJON = require('./routes/api/xml');

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

// express validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

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

// global vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', index);
//app.use("/", daily);
app.use('/users', users);
app.use('/token', tokensApi);

handleXMLToJON.XMLREQUEST();

// set passport
app.set('port', config.port);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});

module.exports = app;
