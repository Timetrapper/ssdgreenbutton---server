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
var LocalStrategy = require('passport-local').Strategy;
// Routes
var routes = require('./routes/');
var tokensApi = require('./routes/api/tokens');
var users = require('./routes/users');
var index = require('./routes/index');
var dataApi = require('./routes/api/data');
// Initialize app
var app = express();
// Application Settings & Middleware
appSettings.APPSETTINGS();
// Connection to Mongo & Mongoose
connectToDB.CONNECTTODB();
// Set Express Validation
useExpressValidator.USEVALIDATOR();
// Call XML Parse Request
<<<<<<< HEAD

handleXMLToJON.XMLREQUEST();

=======
handleXMLToJSON.XMLREQUEST();
>>>>>>> 9531bfe59c0c86efc0195d48e173e2dc745c9a1e
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
