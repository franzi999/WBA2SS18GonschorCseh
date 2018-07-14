/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

//Import functions
const registerUser = require('./functions/RegisterUserFunc');
const login = require('./functions/LoginFunc');
const registerQuestion = require('./functions/RegisterQuestionFunc');
const registerMcQuestion = require('./functions/RegisterMcFunc');
const getQuestion = require('./functions/GetQuestion');

const config = require('./config/tsconfig');

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

//Define and implement the routes
module.exports = router => {

    //Register a new user. Post function to add a user to the DB
    router.post('/users', (req, res) => {

        const email = req.body.email;
        const password = req.body.hashed_pass;

        console.log(email);

        if (!email || !password || !email.trim() || !password.trim()){
            res.status(400).json({message: 'Invalid Request!'});
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

        if (!credentials) {
            res.status(400).json({ message: 'Invalid Request!' });
        } else {
            login.loginUser(credentials.name, credentials.pass)
                .then(result => {
                    const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
                    res.status(result.status).json({ status: result.status, message: result.message, token: token });
                })
                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

    //Add a new Question to the DB POST
    router.post('/questions', (req, res) => {

        //Extract the data from the body
        const frage = req.body.frage;
        const thema = req.body.thema;
        const level = req.body.level;
        const author = req.body.author;
        const antwort = req.body.antwort;

        //Check if the data is valid
        if (!frage || !thema || !level || !author || !antwort || !frage.trim() || !author.trim()) {
            res.status(400).json({message: 'Invalid Request!'});
        } else {

            //If the parameters are not null, call the register to DB function
            registerQuestion.registerQuestion(frage, thema, level, author, antwort)
                .then(result => {
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //Add a new Multiple Choice Question to the DB POST
    router.post('/mcquestions', (req, res) => {

        //Extract the data from the body
        const mcFrage = req.body.mcFrage;
        const mcThema = req.body.mcThema;
        const mcLevel = req.body.mcLevel;
        const mcAuthor = req.body.mcAuthor;
        const mcAntwortA = req.body.mcAntwortA;
        const mcAntwortB = req.body.mcAntwortB;
        const mcAntwortC = req.body.mcAntwortC;
        const mcAntwortD = req.body.mcAntwortD;
        const mcIstRichtigA = req.body.mcIstRichtigA;
        const mcIstRichtigB = req.body.mcIstRichtigB;
        const mcIstRichtigC = req.body.mcIstRichtigC;
        const mcIstRichtigD = req.body.mcIstRichtigD;

        //Check if the data is valid
        if (!mcFrage || !mcThema || !mcLevel || !mcAuthor || !mcAntwortA || !mcAntwortB || !mcAntwortC || !mcAntwortD|| !mcFrage.trim() || !mcAuthor.trim()) {
            res.status(400).json({message: 'Invalid Request!'});
        } else {

            //If the parameters are not null, call the register to DB function
            registerMcQuestion.registerQuestion(mcFrage, mcThema, mcLevel, mcAuthor, mcAntwortA, mcAntwortB,mcAntwortC, mcAntwortD, mcIstRichtigA, mcIstRichtigB, mcIstRichtigC, mcIstRichtigD)
                .then(result => {
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    router.post('/geteasyquestions',(req, res) => {

        //Extract the data from the body
        const thema = req.body.thema;
        const level = req.body.level;
        const author = '';


        //Check if the data is valid
        if (!thema || !level) {
            console.log("error");
            res.status(400).json({message: 'Invalid Request!'});
        } else {

            //If the parameters are not null, call the register to DB function
            getQuestion.getFrage(thema, level, author)
                .then(result => {
                    res.status(result.status).json(result)
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(err.status).json({message: err.message})
                });
        }
    });

    router.post('/getmoderatequestions',(req, res) => {

        //Extract the data from the body
        const thema = req.body.thema;
        const level = req.body.level;
        const author = req.body.author;


        //Check if the data is valid
        if (!thema || !level) {
            res.status(400).json({message: 'Invalid Request!'});
        } else {

            //If the parameters are not null, call the register to DB function
            getQuestion.getFrage(thema, level, author)
                .then(result => {
                    res.status(result.status).json(result)
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    router.post('/gethardquestions',(req, res) => {

        //Extract the data from the body
        const thema = req.body.thema;
        const level = req.body.level;
        const author = req.body.author;


        //Check if the data is valid
        if (!thema || !level) {
            res.status(400).json({message: 'Invalid Request!'});
        } else {

            //If the parameters are not null, call the register to DB function
            getQuestion.getFrage(thema, level, author)
                .then(result => {
                    res.status(result.status).json(result)
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

};