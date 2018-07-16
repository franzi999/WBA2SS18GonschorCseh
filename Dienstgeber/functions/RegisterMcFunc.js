'use strict';

const mcQuestion = require('../model/mc_frage');
const ObjectId = require('mongodb').ObjectId;

exports.registerQuestion = (mcFrage, mcThema, mcLevel, mcAuthor, mcAntwortA, mcAntwortB, mcAntwortC, mcAntwortD, mcIstRichtigA, mcIstRichtigB, mcIstRichtigC, mcIstRichtigD) =>

    new Promise((resolve,reject) => {

        //Create unique generated id
        const id = new ObjectId().toHexString();

        const newMcQuestion = new mcQuestion({
            mcId: id,
            mcFrage: mcFrage,
            mcThema: mcThema,
            mcLevel: mcLevel,
            mcAuthor: mcAuthor,
            mcAntwortA: mcAntwortA,
            mcAntwortB: mcAntwortB,
            mcAntwortC: mcAntwortC,
            mcAntwortD: mcAntwortD,
            mcIstRichtigA: mcIstRichtigA,
            mcIstRichtigB: mcIstRichtigB,
            mcIstRichtigC: mcIstRichtigC,
            mcIstRichtigD: mcIstRichtigD
        });

        newMcQuestion.save()

            .then(() => resolve({ status: 201, message: 'Multiple Choice Question Registered Successfully!' }))
            .catch(err => {
                if (err.code === 11000) {
                    reject({ status: 409, message: 'Multiple Choice Question Already Registered!'});
                } else {
                    reject({ status: 500, message: 'Internal Server Error!' });
                }
            });
    });