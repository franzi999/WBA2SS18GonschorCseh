const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const router = express.Router();

//Set the routes
require('./routes')(router);
const app = express();

app.get('/', function(req, res){
    res.render('index.ejs');
    console.log('Startseite');
});

app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'));
app.use(express.static(__dirname+ '/views'));

//Use Acces-Control-Allow-Origin for browsers
app.use(cors());
app.use('/', router);



app.listen(3001, function () {
    console.log('Quiz online auf Port 3001');
});



