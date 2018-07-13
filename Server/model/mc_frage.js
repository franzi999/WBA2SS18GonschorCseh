'use strict';

//Declarare dependencies
const mongoose = require('mongoose');

//Create Question schema in DB
const mcFrageSchema = mongoose.Schema({

    mcId                 : {
        type:String,
        required:true,
        unique:true
    },
    mcFrage              : {
        type:String,
        required:true
    },
    mcThema              : {
        type:String,
        required:true
    },
    mcLevel              : Number,
    mcAuthor             : String,
    mcAntwortA            : {
        type:String,
        required:true
    },
    mcAntwortB           : {
        type:String,
        required:true
    },
    mcAntwortC            : {
        type:String,
        required:true
    },
    mcAntwortD            : {
        type:String,
        required:true
    },
    mcIstRichtigA         : Boolean,
    mcIstRichtigB         : Boolean,
    mcIstRichtigC         : Boolean,
    mcIstRichtigD         : Boolean
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz-db');
module.exports = mongoose.model('mcFrage', mcFrageSchema);