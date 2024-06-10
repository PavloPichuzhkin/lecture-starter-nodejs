import {Router} from "express";
import {fightersService} from "../services/fightService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";
import {createFightValid, updateFightValid} from "../middlewares/fight.validation.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get(
    "/",
    (req, res, next) => {
        try {
            const fights = fightersService.getAll();

            if (!fights.length) {
                throw new Error("There are no Fights Data in DB");
            }
            res.data = fights;
        } catch (err) {
            res.notFound = true;
            res.message = err.message;
        }
        next();
    },
    responseMiddleware
);

router.get(
    "/:id",
    (req, res, next) => {
        try {
            const fightById = fightersService.getById(req.params.id);

            if (!fightById) {
                throw new Error("Fight not found");
            }
            res.data = fightById;
        } catch (err) {
            res.notFound = true;
            res.message = err.message;
        }
        next();
    },
    responseMiddleware
);

router.post(
    "/",
    createFightValid,
    (req, res, next) => {
        if (!res.badRequest) {
            try {
                res.data = fightersService.create(req.body);
            } catch (err) {
                res.badRequest = true;
                res.message = err.message;
            }
        }
        next();
    },
    responseMiddleware
);

router.patch(
    "/:id",
    updateFightValid,
    (req, res, next) => {
        if (!res.badRequest) {
            try {
                const {log} = req.body;
                const {id} = req.params;

                if (!fightersService.search({id})) {
                    res.notFound = true;
                    throw new Error("Fight to update not found");

                } else {

                    res.data = fightersService.updateFight(id, log, res);
                }
            } catch (err) {
                res.badRequest = true;
                res.message = err.message;
            }
        }
        next();
    },
    responseMiddleware
);

router.delete(
    "/:id",
    (req, res, next) => {
        try {
            const {id} = req.params;

            if (!fightersService.search({id})) {
                throw new Error("Fight to delete not found");
            }
            res.data = fightersService.delete(req.params.id);
        } catch (err) {
            res.notFound = true;
            res.message = err.message;
        }
        next();
    },
    responseMiddleware
);

export {router};
