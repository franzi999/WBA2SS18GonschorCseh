/*var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg'); */



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cp = require('cookie-parser');

const router = express.Router();

//Set the routes
require('./routes')(router);
const app = express();

app.use(bodyParser.json());
app.use(cp());
app.use(express.static(__dirname+ '/public'));
app.use(express.static(__dirname+ '/views'));

//Use Acces-Control-Allow-Origin for browsers
app.use(cors());
app.use('/', router);

app.listen(3001, function () {
    console.log('Quiz online auf Port 3001');
});



