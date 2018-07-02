'use strict';

const frage = require('../model/frage');


exports.getQuestions = thema =>

    new Promise((resolve,reject) => {


        frage.find({thema : thema})

            .then(frages => resolve(frages))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });