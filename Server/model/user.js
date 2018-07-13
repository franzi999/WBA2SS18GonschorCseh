'use strict';

//Declare dependencies
const mongoose = require('mongoose');

//Create Question schema in DB
const userSchema = mongoose.Schema({

    email: {
        type:String,
        required:true,
        unique:true
    },
    hashed_pass: {
        type:String,
        required:true
    },
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz-db');
module.exports = mongoose.model('user', userSchema);