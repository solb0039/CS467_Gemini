// Description: Javascript file to be used with Gemini website

// Variable set up
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[2]);

// Use bodyParser as middleware for post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create JSON parser
var jsonParse = bodyParser.json();

// Set up the website pages 
app.use('/login', require('./login.js'))
app.use('/public', express.static('public'));

// app.get and render for each page
app.get('/', function (req, res) {
    res.render('login');
});

// Set up 404 and 500 errors
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

// Run
app.listen(app.get('port'), function () {
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
