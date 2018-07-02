/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

// Declare dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/static"));
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

//Use body-Parser for parsing the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set the routes
require('./routes')(router);

//Use Acces-Control-Allow-Origin for browsers
app.use(cors());
app.use('/', router);

//Set port
app.set('port', port);


//Connect & check the database connection
mongoose.connect('mongodb://localhost/quiz-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected');
});

//Start Server, and listen on the defined port
app.listen(app.get('port'), function () {
    console.log('Server online');
});






















/*
function incr(){
    var n = 0;
    n++;
    return n;
}
*/
// var io = require('socket.io')(http);

/*io.on('connection', function (socket){
    console.log('connection');

    socket.on('CH01', function (from, msg) {
        console.log('MSG', from, ' saying ', msg);
    });

});*/

/*http.listen(3000, function () {
    console.log('listening on *:3000');
});*/


/*app.get('/', function (req, res) {
    res.send('Hallo, World!!!');
});*/
/*


app.get('/login', function (req, res) {
    res.render('javascript_login.ejs');
    client.keys('user:*', function(err,rep){
        var users = [];
        if(rep.length == 0){
            res.json(users);
            return;
        }
        client.mget(rep,function(err,rep){
            rep.forEach(function(val){
                users.push(JSON.parse(val));
            });
            res.json(users);
        });
    });
});

app.post('/registration', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.json(
        {
            message: 'signup success',
            username : username,
            password : password,
        }
    );
})


//app.get('/addQuestion', function(req,res){
    //res.render('addQuestion.ejs');
//})


app.get('/registration', function(req,res){
    res.render('registration.ejs');
})


*/




