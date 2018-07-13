'use strict';

const frage = require('../model/frage');

exports.getFrage = (thema, level, author) =>

    new Promise((resolve,reject) => {

        frage.find({thema: thema, level: level})
            .then(frages => {
                if (frages.length === 0) {
                    reject({ status: 404, message: 'No questions Found !' });
                } else {
                    return frages;
                }
            })

            .catch(err => reject({ status: 500, message: 'Internal Server Error!' }));
    });