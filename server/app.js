var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var config = require('./config/');
var cookieParser = require('cookie-parser');
const espiParser = require('espi-parser');
var exphbs = require('express-handlebars');
var express = require("express");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var session = require('express-session');
var del = require('del');
var data = require('./tor-energy-quota.json');

<<<<<<< HEAD

//Upload to Mongoose
var post_schema = mongoose.Schema({data: JSON});
var post_model = mongoose.model('greenbuttondata', post_schema);

var newData = new post_model({data: data});

newData.save(function(err) {
    if(err) {
        throw err;
    }
    console.log('INSERTED');
});

// File upload
//var multer = require('multer')
//ar upload = multer({ dest: 'uploads/' })
=======
//Mlabs
var mongoose = require('mongoose');
mongoose.connect(config.database_mlb);
>>>>>>> edd6e680eceecbc99d49b74edecf47f0bd9b96d2

// Security
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Models


// Routes
var routes = require('./routes/');
var tokensApi = require('./routes/api/tokens');
var users = require('./routes/users');
var index = require('./routes/index');
//var files  = require('./routes/files')();
//app.use('/files', parseUploads, imageRoutes);

// // Get the API route ...
// var api = require('./routes/api.route');

// Database connection
//mongoose.Promise = bluebird;
var db = mongoose.connection;

// Initialize app
var app = express();

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

function finished() {
    console.log("Finished");
}

// Delete files in the uploads folder
function cleanFolder(folderPath) {
    // delete files inside folder but not the folder itself
    del.synch(['./public/uploads/*.*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
};

// File upload storage
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    }
});

var upload = multer({
    storage: storage
});

app.post('/upload', upload.single('xml'), function (req, res, next) {
    // req.file is the 'xml' file
    // req.body will hold the text fields, if there were any
    req.flash('success-msg', "Your file has been uploaded.");
    res.redirect('/');
});

/*
// Converts XML to JSON
var convert = require('xml-js');
var xml = require('fs').readFileSync('./xml/tor-data.xml', 'utf8');
var options = {
    ignoreComment: true,
    ignoreDoctype: true,
    alwaysChildren: true,
    spaces: 2,
    compact: true
};

var result = convert.xml2json(xml, options);
var jSONData = JSON.parse(result);
fs.writeFile('tony-energy.json', result, finished);
*/

/*
// Converts XML to JSON with espi removed
var xml = require('fs').readFileSync('./xml/tor-data.xml', 'utf8');
const util = require('util');
const json = espiParser(xml);

var jSONData = JSON.stringify(json);

fs.writeFile('tor-energy-quota.json', jSONData, finished);
*/

// Route to created JSON file
app.get("/api/xml", function (req, res, next) {
    res.json(result);
});

/*
// Route to green button data
app.get('/api/greenbuttondata', function (req, res) {
    GreenButtonData.getGreenButtonData(function (err, greenbuttondata) {
        if (err) {
            throw err;
        }
        res.json(greenbuttondata);
    })
});
*/

app.use('/', routes);
app.use('/users', users);
app.use('/token', tokensApi);
//app.use('/files', files);
app.use('/', index);

/*
// Test out Saving of jSON to Mongo
db.open(function(err, db) {
    var collection = db.usersenergy("simple_document_insert_collection_no_safe");
    // Insert a single document
    collection.insert(data);
    
    // Wait for a second before finishing up, to ensure we have written the item to disk
    setTimeout(function() {
    
        // Fetch the document
        collection.findOne(data, function(err, item) {
        assert.equal(null, err);
        assert.equal('data', item.energy);
        db.close();
        })
    }, 100);
});
*/

// set passport
app.set('port', config.port);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});

module.exports = app;
