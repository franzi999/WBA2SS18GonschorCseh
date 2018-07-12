/**
 * Created by cseh_17 on 13.05.2017.
 */

//Import functions
const request = require('request');
const jwt = require('jsonwebtoken');

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
            res.render('');
        } else {
            res.status(401).json({ message: 'Invalid Token!' });
        }});



    //router.get('/quiz', (req, res) => res.render('quiz.ejs'));
    //router.get('/addTest', (req, res) => res.render('addTest.ejs'));
    // router.get('/choiceTest', (req,res) => res.render('choiceTest.ejs'));



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

            let newQuestion = req.body;

            newQuestion.author = getUser(req.headers['x-access-token']);

            console.log(newQuestion);

            const options = {
                url: 'http://localhost:3000/questions',
                method: 'POST',
                json: newQuestion
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
                console.log(decoded);
                return decoded.status === 200;
            } catch(err) {
                return false;
            }
        } else {
            return false;
        }
    }

};