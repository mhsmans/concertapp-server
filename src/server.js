//
// server.js
//
var http = require('http');
// express = framework om werken met HTTP requests makkelijker te maken
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongodb = require('./config/mongo.db');

// var userRoutes = require('./api/user.routes');
// var postRoutes = require('./api/post.routes');
// var threadRoutes = require('./api/thread.routes');

var config = require('./config/env/env');

var app = express();

module.exports = {};

app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); 

// configuration
app.set('port', (process.env.PORT | config.env.webPort));
app.set('env', (process.env.ENV | 'development'))

// Morgan logger
app.use(logger('dev'));

// CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Install routes
// app.use('/api', userRoutes);
// app.use('/api', postRoutes);
// app.use('/api', threadRoutes);

app.use(function (err, req, res, next) {
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

// Fallback 
app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

// Start server
app.listen(config.env.webPort, function () {
    console.log('Server listening on port: ' + app.get('port'));
});

module.exports = app;