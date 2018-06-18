'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');


//Register new user function
exports.registerUser = (email, password) =>

    new Promise((resolve,reject) => {

        //Crypt the password trough bcryptjs. The password will be saved as a hash
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({

            email: email,
            hashed_pass: hash
        });

        newUser.save()

            .then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

            .catch(err => {

                //Check if the user already exists
                if (err.code == 11000) {

                    reject({ status: 409, message: 'User Already Registered !' });

                } else {

                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    });