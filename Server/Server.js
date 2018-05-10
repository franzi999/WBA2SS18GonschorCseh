/**
 * Created by franz on 23.04.2018.
 */

/*var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport'),
    flash = require('connect-flash'),
    port = 3001;

//Check DB Connection
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    controller_norm.addNorm();
    console.log('DB connected');
});

//all environments
app.set('port', process.env.PORT || port);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Quiz');
    next();
});

//Test
app.get('/', function (req, res) {
    res.send('Hallo, World!!!');
});

app.listen(app.get('port'), function () {
    console.log('Server online');
}); */

var http = require('http');

var server = http.createServer(function(req, res){
    console.log('request was made:' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hey');
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');