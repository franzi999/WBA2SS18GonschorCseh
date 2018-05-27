/**
 * Created by franz on 23.04.2018.
 */

'use-strict';

// Declare dependencies
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser');

//Databank
const mongoose = require('mongoose');

//Port declaration
const port = process.env.PORT || 3000;
var http = require('http');


//Declare the type of bodyParsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hallo, World!!!');
});

app.get('/Login', LogIn);

//Bind the routes
require('./routes')(router);
app.use('/', router);

//Set the port
app.set('port', port);

//Connect & check the databank connection
mongoose.connect('mongodb://localhost/quiz-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected');
});

//Ich weiss nicht was das ist.
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Quiz');
    next();
});

//Start Server, and listen on the defined port
app.listen(app.get('port'), function () {
    console.log('Server online');
});

