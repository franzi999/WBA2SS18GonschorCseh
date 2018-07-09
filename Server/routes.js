/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

//Import functions
const register = require('./functions/RegisterFunc');
const login = require('./functions/LoginFunc');
const config = require('./config/tsconfig');
const registerUser = require('./functions/RegisterUserFunc');
const question = require('./functions/Questions');

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

//Define and implement the routes
module.exports = router => {

    //Standard GET
    router.get('/', (req, res) => res.render('index.ejs'));
    router.get('/quiz', (req, res) => res.render('quiz.ejs'));
    router.get('/login', (req, res) => res.render('login.ejs'));
    router.get('/addQuestion', (req, res) => res.render('addQuestion.ejs'));
    router.get('/registration', (req, res) => res.render('registration.ejs'));
    router.get('/addTest', (req, res) => res.render('addTest.ejs'));
    router.get('/choiceTest', (req,res) => res.render('choiceTest.ejs'));


    //Add a new Question to the DB POST
    router.post('/addQuestion', (req, res) => {

        //Extract the data from the body
        const frage = req.body.frage;
        const thema = req.body.thema;
        const level = req.body.level;
        const author = req.body.author;
        const antwort = req.body.antwort;

        console.log(req.body.frage);
        console.log(req.body.thema);
        console.log(req.body.level);
        console.log(req.body.author);
        console.log(req.body.antwort);

        //Check if the data is valid
        if (!frage || !thema || !level || !author || !antwort || !frage.trim() || !author.trim()) {

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            //If the parameters are not null, call the register to DB function
            register.registerQuestion(frage, thema, level, author, antwort)

                .then(result => {
                    res.status(result.status).json({message: result.message})
                })

                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });


    //Register a new user. Post function to add a user to the DB
    router.post('/users', (req, res) => {

        const email = req.body.email;
        const password = req.body.hashed_pass;

        console.log(email);

        if (!email || !password || !email.trim() || !password.trim()){

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            registerUser.registerUser(email, password)

                .then(result => {

                    //res.status(result.status).json(req.body);
                    //res.setHeader('Location', '/users/'+email);
                    res.status(result.status).json({ message: result.message })
                })

                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

























    //Authenticate a user
    router.get('/auth', (req, res) => {

        const credentials = auth(req);

        console.log(credentials);

        if (!credentials) {

            res.status(400).json({ message: 'Invalid Request !' });

        } else {

            login.loginUser(credentials.name, credentials.pass)

                .then(result => {

                    const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

                    res.status(result.status).json({ status: result.status, message: result.message, token: token });

                })

                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

    //Get questions in order to start a test
    router.post('/getQuestions', (req,  res) => {

        console.log(req.body.thema);
        question.getQuestions(req.body.thema)

            .then(result => res.json(result))

            .catch(err => res.status(err.status >= 100 && err.status < 600 ? err.status : 500).json({ message: err.message }));

    });

};