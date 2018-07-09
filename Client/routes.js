/**
 * Created by cseh_17 on 13.05.2017.
 */

'use-strict';

//Import functions

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

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



    //Register a new user. Post function to add a user to the DB
    router.post('/registration', (req, res) => {

        console.log("Methode /registration wurde aufgerufen")
        var newUser = req.body;
        console.log(newUser);

        fs.readFile("./views/registration.ejs", {encoding:"utf-8"}, function(err, filestring){
            if(err){
                throw err;
            } else{
                let options = {
                    host: "localhost",
                    port: 3000,
                    path: "/users",
                    method:"POST",
                };
                let externalRequest = http.request(options, function(externalResponse){
                    console.log("Mit dem Server verbunden -- Port 3000 -- Path : /users -- Methode : POST");
                    externalResponse.on('data', function(chunk){
                        newUser = JSON.parse(chunk);
                        let html = ejs.render(filestring, {newUser: newUser, filename: __dirname + '/views/registration.ejs'});
                        res.setHeader("content-type", "text/html");
                        res.writeHead(200);
                        res.write(html);
                        res.end();
                    });
                    externalRequest.on('error', function(e) {
                        console.log('problem with request: ' + e.message);
                    });
                });
                externalRequest.setHeader("content-type", "application/json");
                externalRequest.write(JSON.stringify(req.body));
                externalRequest.end();
            }
        });
    });

};