/**
 * Created by cseh_17 on 13.05.2017.
 */

//Import functions
const request = require('request');
const jwt = require('jsonwebtoken');
const https = require ('https');

let accessKey = 'cdb7da49c5b54138bcc5aa835df75565';
let uri = 'westcentralus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/keyPhrases';
let questionLevel;
let newQuestion;

const config = require('./config/tsconfig');

//Define and implement the routes
module.exports = router => {

    //Standard GET
    router.get('/', (req, res) => res.render('index.ejs'));
    router.get('/registration', (req, res) => res.render('registration.ejs'));
    router.get('/login', (req, res) => res.render('login.ejs'));
    router.get('/home/:token',  function(req, res){

        let token = req.params.token;
        if (checkToken(token)) {
            res.render('home.ejs')
        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }});
    router.get('/home/addQuestion/:token', function(req, res){

        let token = req.params.token;
        if (checkToken(token)) {
            res.render('addQuestion.ejs');
        } else {
            res.status(401).json({ message: 'Invalid Token!' });
        }});
    router.get('/home/addMcQuestion/:token', function(req, res){

        let token = req.params.token;
        if (checkToken(token)) {

            // Franzi, hier bitte ein ejs für MC Fragen
            res.render('addMcQuestion.ejs');
        } else {
            res.status(401).json({ message: 'Invalid Token!' });
        }});
    router.get('/quiz/:token', function(req, res){

        let token = req.params.token;
        if (checkToken(token)) {
            res.render('quiz.ejs');
        } else {
            res.status(401).json({ message: 'Invalid Token!' });
        }});



    //router.get('/quiz', (req, res) => res.render('quiz.ejs'));



    //Register a new user. Post function to add a user to the DB
    router.post('/registration', (req, res) => {

        console.log("Methode /registration wurde aufgerufen");
        let newUser = req.body;
        console.log(newUser);

        const options = {
            url: 'http://localhost:3000/users',
            method: 'POST',
            json: newUser
        };


        request.post(options, function (err, httpResponse, body) {
            if (err){
                console.error(err)
                res.send(err.statusCode);
            } else {
                res.send(httpResponse.statusCode);
                console.log(httpResponse.statusCode, body);
            }
        });
    });

    router.post('/login', (req, res) => {

        let credentials = req.body;

        if (!credentials){
            res.status(400).json({message: 'Bitte E-mail und Passwort eingeben'});
        } else {

            const url = "http://localhost:3000/auth";
            let auth = "Basic " + new Buffer(credentials.email + ":" + credentials.pass).toString("base64");
            request(
                {
                    url : url,
                    headers : {
                        "Authorization" : auth
                    }
                }, function (err, httpResponse, body) {

                    if (err){
                        console.error(err);
                        res.status(err.statusCode).json(body);
                    }  else {
                        res.status(httpResponse.statusCode).json(body);
                        console.log(httpResponse.statusCode, body);
                    }
                });
        }

    });

    router.post('/home/addQuestion', (req, res) => {

        console.log("Methode /addQuestion wurde aufgerufen");

        if (checkToken(req.headers['x-access-token'])) {

            newQuestion = req.body;
            newQuestion.author = getUser(req.headers['x-access-token']);
            let document =
                { 'documents':[
                        { 'id': '1', 'language': 'de', 'text': newQuestion.antwort },
                    ]
                };
            getKeywords(document);
            res.status(200).json({message: 'Level Berechnen & Speichern'});
        } else {
            res.status(401).json({ message: 'Invalid Token !' });
        }
    });

    router.post('/home/addMcQuestion', (req, res) => {

        console.log("Route addMcQuestion wurde aufgerufen");

        if (checkToken(req.headers['x-access-token'])) {

            let newMcQuestion = req.body;

            newMcQuestion.mcAuthor = getUser(req.headers['x-access-token']);

            console.log(newMcQuestion);

            const options = {
                url: 'http://localhost:3000/mcquestions',
                method: 'POST',
                json: newMcQuestion
            };

            request.post(options, function (err, httpResponse, body) {
                if (err) {
                    console.error(err);
                    res.send(err.statusCode);
                } else {
                    res.send(httpResponse.statusCode);
                    console.log(httpResponse.statusCode, body);
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid Token!' });
        }
    });

    router.post('/quiz/getQuestions', (req, res) => {

        console.log("Route getQuestion wurde aufgerufen");

        let questions = {};

        if (checkToken(req.headers['x-access-token'])) {

                const options = {
                    url: 'http://localhost:3000/getquestions',
                    method: 'POST',
                    json: req.body
                };

                console.log(req.body);
                request.post(options, function (err, httpResponse, body) {
                    if (err) {
                        console.error(err);
                        res.send(err.statusCode);
                    } else {
                        console.log(httpResponse.statusCode);
                        questions.Questions = body.message;
                        res.status(200).json(questions);
                    }
                });
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////



    function getUser(token) {

        if (token) {
            try {
                let decoded = jwt.verify(token, config.secret);
                console.log(decoded.message);
                return decoded.message;
            } catch(err) {
                return false;
            }
        } else {
            return false;
        }
    }

    function checkToken(token) {

        if (token) {
            try {
                let decoded = jwt.verify(token, config.secret);
                return decoded.status === 200;
            } catch(err) {
                return false;
            }
        } else {
            return false;
        }
    }

    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            let body_ = JSON.parse (body);
            //let body__ = JSON.stringify (body_, null, '  ');
            //console.log (body__);
            console.log(body_.documents[0].keyPhrases.length);
            if (body_.documents[0].keyPhrases.length <= 5){
                questionLevel = "easy";
            }
            if (body_.documents[0].keyPhrases.length > 5 && body_.documents[0].keyPhrases.length <= 10){
                questionLevel = "moderate";
            }
            if (body_.documents[0].keyPhrases.length > 10){
                questionLevel = "hard";
            }
            console.log(questionLevel);

            newQuestion.level = questionLevel;

            const options = {
                url: 'http://localhost:3000/questions',
                method: 'POST',
                json: newQuestion
            };

            request.post(options, function (err, httpResponse, body) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(httpResponse.statusCode, body);
                }
            });

        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };

    let getKeywords = function (document) {
        let body = JSON.stringify (document);

        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers : {
                'Ocp-Apim-Subscription-Key' : accessKey,
            }
        };

        let req = https.request (request_params, response_handler);
        req.write (body);
        req.end ();
    };

};