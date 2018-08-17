// Description: Javascript file to be used with Gemini website

// Variable set up
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var fileUpload = require('express-fileupload');
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var nocache = require('nocache');

app.use(nocache());
app.set('etag', false);
app.disable('view cache');

app.engine('handlebars', handlebars.engine);
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[2] || 8080);

// Use bodyParser as middleware for post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create JSON parser
var jsonParse = bodyParser.json();

// Set up the website pages 
app.use('/admin', require('./routes/admin.js'));
app.use('/users', require('./routes/users.js'));
app.use('/analytics', require('./routes/analytics.js'));
app.use('/numberAwards', require('./routes/numberAwards.js'));
app.use('/receivedAwards', require('./routes/receivedAwards.js'));
app.use('/typeAwards', require('./routes/typeAwards.js'));
app.use('/createdAwards', require('./routes/createdAwards.js'));
app.use('/receivedType', require('./routes/receivedType.js'));
app.use('/data', require('./routes/data.js'));
app.use('/awards', require('./routes/awards.js'));
app.use('/regular', require('./routes/regular.js'));
app.use('/public', express.static('public')); 

// app.get and render for home page
app.get('/', (req, res) => {
    res.render('login');
});

// Set up 404 and 500 errors
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

process.on('uncaughtException', (err) => {
    console.log(err);
}); 

// Run
app.listen(app.get('port'), () => {
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
