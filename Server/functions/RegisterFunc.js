'use strict';

const question = require('../model/frage');
const ObjectId = require('mongodb').ObjectId;

exports.registerQuestion = (frage, level, author, antwort) =>

    new Promise((resolve,reject) => {

        //Create unique generated id
        var id = new ObjectId().toHexString();


        const newQuestion = new question({
            id: id,
            frage: frage,
            level: level,
            author: author,
            antwort: antwort,
        });

        newQuestion.save()

            .then(() => resolve({ status: 201, message: 'Question Registered Sucessfully !' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 409, message: 'Question Already Registered!'});

                } else {

                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    });