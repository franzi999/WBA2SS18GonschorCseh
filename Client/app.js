/*var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg'); */



var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var http = require('http');
const cors = require('cors');
var app = express();
var server = http.createServer(app);
var port = 3000;

const router = express.Router();



app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'));
app.use(express.static(__dirname+ '/views'));



require('./routes')(router);

//Use Acces-Control-Allow-Origin for browsers
app.use(cors());
app.use('/', router);



app.get('/', function(req, res){
    res.render('index.ejs');
    console.log('Startseite');
});




/*app.get('/quiz', function(req, res){
    res.render('quiz.ejs');
    console.log('Quiz');
});

app.get('/login', function(req, res){
    res.render('javascript_login.ejs');
    console.log('Login');
});

app.get('/addTest', function(req, res){
    res.render('addTest.ejs');
    console.log('Frage hinzugefügt');
});

app.get('choiceTest', function (req,res) {
    res.render('choiceTest.ejs');
});

app.post('/login', jsonParser, function (req, res) {
    console.log('logged in');

    var options = {
        host: 'localhost',
        port: '3000',
        path: '/login',
        method: "POST",
    }
    var externalRequest = http.request(options, function (externalResponse) {
        console.log('Logged in');
        externalResponse.on("data", function (chunk) {
            console.log(chunk);
            var response = JSON.parse(chunk);

            res.json(response)
            res.end();
        });
    });

})

app.get('/registration', function(req,res){
    res.render('registration.ejs');
});

app.post("/registration", jsonParser, function(req, res) {

    var newQuestion = JSON.stringify(req.body);
    console.log(newUser);

    var options = {
        host: 'localhost',
        port: '3000',
        path: '/registration',
        method: "POST"
    }
    var externalRequest = http.request(options, function (externalResponse) {
        console.log('User hinzufügen');
        externalResponse.on("data", function (chunk) {
            console.log(chunk);
            var response = JSON.parse(chunk);

            res.json(response)
            res.end();
        });
    });
    externalRequest.setHeader("content-type", "application/json");
    externalRequest.write(JSON.stringify(req.body));
    console.log("post new User");
    externalRequest.end();
});


app.get('/addQuestion', function(req,res){
    res.render('addQuestion.ejs');
});

app.post("/addQuestion", jsonParser, function(req, res){

    var newQuestion = JSON.stringify(req.body);
    console.log(newQuestion);

    var options = {
        host: 'localhost',
        port: '3000',
        path: '/addQuestion',
        method: "POST"
    }

    var externalRequest = http.request(options, function(externalResponse){
        console.log('Frage hinzufügen');
        externalResponse.on("data", function(chunk) {
            console.log(chunk);
            var response = JSON.parse(chunk);

            res.json(response)
            res.end();
        });
    });

    externalRequest.setHeader("content-type", "application/json");
    externalRequest.write(JSON.stringify(req.body));
    console.log("post new Question");
    externalRequest.end();
});

if (typeof document === 'undefined') {
    global.document = {
        createElement: () => null };
}

function populate(){
    if(quiz.isEnded){
        showScores();
   }
    else {
        var element = document.getElementById("question");
        elemt.innerHTML = quiz.getQuestionIndex().text;
        
        var choices = quiz.getQuestionIndex().choices;
        for(var i=0; i < choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i] );
            
        }
        showProgress();
        
   }
}

function guess(id, guess){
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
    
}

function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + i;
    var element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + "of" + quiz.questions.length;
    
}

function showScores(){
    var gameOverHtml ="<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your score" + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    
}
function Question(text, choices, answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

var questions = [
    new Question("Welche Farbe hat eine Aubergine?", ["lila", "grün", "gelb", "rot"]),
    new Question("In welchem Bundesland liegt Köln?", ["Nordrhein-Westfalen", "Schleswig-Holstein", "Bayern", "Sachsen"])
];
function Quiz(questions){
    this.score = 0;
    this.question = Question;
    this.questionIndex = 0;
}

var quiz = new Quiz(questions);
//populate();
*/


app.listen(3001, function () {
    console.log('Quiz online auf Port 3001');
});



