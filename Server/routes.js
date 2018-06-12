/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

//Import functions
const register = require('./functions/RegisterFunc');

//Define and implement the routes
module.exports = router => {

    //Standard GET
    router.get('/', (req, res) => res.render('index.ejs'));
    router.get('/quiz', (req, res) => res.render('quiz.ejs'));
    router.get('/login', (req,res) => res.render('javascript_login.ejs'));
    router.get('/addQuestion',(req,res) => res.render('addQuestion.ejs'));
    router.get('/registration',(req,res)=> res.render('registration.ejs'));

    //Add a new Question to the DB POST
    router.post('/addQuestion', (req, res) => {

        //Extract the data from the body
        const frage = req.body.frage;
        const level = req.body.level;
        const author = req.body.author;
        const antwort = req.body.antwort;

    console.log(req.body.frage);
    console.log(req.body.level);
    console.log(req.body.author);
    console.log(req.body.antwort);

    //Check if the data is valid
    if (!frage || !level || !author || !antwort || !frage.trim() || !author.trim()){

        res.status(400).json({message: 'Invalid Request !'});

    } else {

        //If the parameters are not null, call the register to DB function
        register.registerQuestion(frage, level, author, antwort)

            .then(result => {
            res.status(result.status).json({ message: result.message })
    })

    .catch(err => res.status(err.status).json({ message: err.message }));
    }
});
}