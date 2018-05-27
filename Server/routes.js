/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

//Import functions
const register = require('./functions/RegisterFunc');

//Define and implement the routes
module.exports = router => {

    //Standard GET
    router.get('/', (req, res) => res.end('Welcome to Quiz-Lernen!'));

    //Add a new Question to the DB POST
    var router;
    router.post('/addQuestion', (req, res) => {

        const frage = req.body.frage;
        const level = req.body.level;
        const author = req.body.author;
        const antwort = req.body.antwort;

        console.log(req.body.frage);
        console.log(req.body.level);
        console.log(req.body.author);
        console.log(req.body.antwort);

        if (!frage || !level || !author || !antwort || !frage.trim() || !level.trim() || !author.trim()){

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            //If the parameters are not null, call the register to DB function
            register.registerQuestion(frage, level, author, antwort)

                .then(result => {
                    //res.setHeader('Location', '/questions/'+id);
                    res.status(result.status).json({ message: result.message })
                })

                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });


}