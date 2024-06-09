import {USER} from "../models/user.js";

// const phoneNumberRegExp = /\+380[0-9]{9}$/;
// const emailRegExp = /^\w+([.-]?\w+)*@gmail.com/;
const emailRegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@(gmail+)\.(com)$/, "g");
const phoneNumberRegExp = new RegExp(
    /(\+380)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/,
    "g"
);

const createUserValid = (req, res, next) => {
    // TODO: Implement validator for USER entity during creation
    try {
        if (req.body.id) {
            delete req.body.id
        }

        if (!Object.keys(req.body).length) throw new Error('Empty object');

        const {firstName, lastName, email, phoneNumber, password} = req.body;

        Object.keys(req.body).forEach((key) => {
            if (!USER.hasOwnProperty(key)) {
                throw new Error('Excessive property of the user');
            }
        });

        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            throw new Error('Name, Last Name, email, phone number and password are required');
        }

        if (!email.match(emailRegExp)) {
            throw new Error('Incorrect email');
        }

        if (!phoneNumber.match(phoneNumberRegExp)) {
            throw new Error('Incorrect phone number');
        }

        if (password.length < 3) {
            throw new Error('Incorrect password');
        }

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during update
    try {

        if (req.body.id) {
            delete req.body.id
        }

        const {firstName, lastName, email, phoneNumber, password} = req.body;

        if (!firstName && !lastName && !email && !phoneNumber && !password) {
            throw new Error('One of field is required');
        }

        Object.keys(req.body).forEach((key) => {
            if (!USER.hasOwnProperty(key)) {
                throw new Error('Excessive property of the user');
            }

            switch (key) {
                case "email":
                    if (!email.match(emailRegExp)) {
                        throw new Error('Incorrect email');
                    }
                    break;
                case "phoneNumber":
                    if (!phoneNumber.match(phoneNumberRegExp)) {
                        throw new Error('Incorrect phone number');
                    }
                    break;
                case "password":
                    if (password.length < 3) {
                        throw new Error('Incorrect password');
                    }
                    break;
            }
        });

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

export {createUserValid, updateUserValid};
