'use strict';

//Declarare dependencies
const mongoose = require('mongoose');

//Create Question schema in DB
const frageSchema = mongoose.Schema({

    id                 : {
        type:String,
        required:true,
        unique:true
    },
    frage              : {
        type:String,
        required:true
    },
    thema              : {
        type:String,
        required:true
    },
    level              : String,
    author             : String,
    antwort            : {
        type:String,
        required:true
    },
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz-db');
module.exports = mongoose.model('frage', frageSchema);