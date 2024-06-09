import {FIGHTER} from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
    // TODO: Implement validator for FIGHTER entity during creation
    try {
        if (!Object.keys(req.body).length) throw new Error('Empty object');

        const {defense, power, name} = req.body;

        Object.keys(req.body).forEach((key) => {
            if (!FIGHTER.hasOwnProperty(key)) {
                throw new Error('Excessive property of the fighter');
            }
        });

        if (!defense || !power || !name) {
            throw new Error('Name, Power and Defense fields must be fill');
        }

        if (power < 1 || power > 100 || typeof power != 'number') {
            throw new Error('Power must be number 1 ≤ power ≤ 100');
        }

        if (defense < 1 || defense > 10 || typeof defense != 'number') {
            throw new Error('Defense must be number 1 ≤ defense ≤ 10');
        }

        if (!req.body.health) req.body.health = 85;

        if (req.body.health < 80 || req.body.health > 120 || typeof req.body.health != 'number') {
            throw new Error('Health must be number 80 ≤ health ≤ 120');
        }

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validator for FIGHTER entity during update
    try {

        const {defense, power, name, health} = req.body;

        Object.keys(req.body).forEach((key) => {
            if (!FIGHTER.hasOwnProperty(key)) {
                throw new Error('Excessive property of the fighter');
            }
        });

        if (!name && !power && !defense && !health) {
            throw new Error('One of field must be fill');
        }

        if (power === 0 || power && (power < 1 || power > 100 || typeof power != 'number')) {
            throw new Error('Power must be number 1 ≤ power ≤ 100');
        }

        if (defense === 0 || defense && (defense < 1 || defense > 10 || typeof defense != 'number')) {
            throw new Error('Defense must be number 1 ≤ defense ≤ 10');
        }

        if (health && (health < 80 || health > 120 || typeof health != 'number')) {
            throw new Error('Health must be number 80 ≤ health ≤ 120');
        }

    } catch (err) {
        res.badRequest = true;
        res.message = err.message;
    }
    next();
};

export {createFighterValid, updateFighterValid};
