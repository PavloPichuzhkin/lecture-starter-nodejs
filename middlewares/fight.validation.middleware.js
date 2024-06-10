import {FIGHT, LOG} from "../models/fight.js";
import {fighterService} from "../services/fighterService.js";

const createFightValid = (req, res, next) => {
    try {
        if (req.body.id) {
            delete req.body.id
        }

        if (!Object.keys(req.body).length) throw new Error('Empty object');

        const {fighter1, fighter2} = req.body;

        Object.keys(req.body).forEach((key) => {
            if (!FIGHT.hasOwnProperty(key)) {
                throw new Error('Excessive property of the Fight');
            }
        });

        if (!fighter1 || !fighter2) {
            throw new Error('Fighter1 ID and Fighter2 ID are required');
        }

        function noSuchFighter(fighter) {
            if (!fighterService.getById(fighter)) {
                throw new Error(`There is no Fighter with ID ${fighter}`);
            }
        }

        noSuchFighter(fighter1);
        noSuchFighter(fighter2);

        if (!req.body.log) req.body.log = [];

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

const updateFightValid = (req, res, next) => {
    try {

        if (req.body.id) {
            delete req.body.id
        }

        const {fighter1, fighter2, log} = req.body;

        if (fighter1 || fighter2) {
            delete req.body.fighter1
            delete req.body.fighter2
            throw new Error('You cannot change the Fighter in Battle yet');
        }

        Object.keys(req.body).forEach((key) => {
            if (!FIGHT.hasOwnProperty(key)) {
                throw new Error('Excessive property of the Fight');
            }

        });

        Object.keys(log).forEach((key) => {
            if (!LOG.hasOwnProperty(key)) {
                throw new Error('Excessive property of the Fight');
            }

        });

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

export {createFightValid, updateFightValid};
