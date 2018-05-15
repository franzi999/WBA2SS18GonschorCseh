'use strict';

//Declarare dependencies
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

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
    level              : Number,
    author             : String,
    antwort            : {
        type:String,
        required:true
    },
});

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/quiz-lernen');
module.exports = mongoose.model('frage', frageSchema);