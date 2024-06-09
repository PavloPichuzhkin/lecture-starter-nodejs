import {Router} from "express";
import {fighterService} from "../services/fighterService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";
import {createFighterValid, updateFighterValid} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
    "/",
    (req, res, next) => {
        try {
            const fighters = fighterService.getAll();

            if (!fighters.length) {
                throw new Error("There are no Fighters in DB");
            }
            res.data = fighters;
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
            const fighterById = fighterService.getById(req.params.id);

            if (!fighterById) {
                throw new Error("Fighter not found");
            }
            res.data = fighterById;
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
    createFighterValid,
    (req, res, next) => {
        if (!res.badRequest) {
            try {
                const {name} = req.body;

                if (fighterService.getBy({name})) {
                    throw new Error("Fighter with such name already exists");
                }
                res.data = fighterService.create(req.body);
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
    updateFighterValid,
    async (req, res, next) => {
        if (!res.badRequest) {
            try {
                const {name} = req.body;
                const userId = req.params.id;

                if (!fighterfService.getBy({id: userId})) {
                    throw new Error("Fighter to update not found");
                }

                const updateCandidate = fighterService.getBy({name})

                if (updateCandidate && (updateCandidate.id !== userId)) {

                    throw new Error("Fighter with such name already exists");
                }

                res.data = fighterService.update(userId, req.body);
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
            if (!id) { // non real rout http://localhost:3333/api/fighter
                throw new Error("Where is your fu ID");
            }

            if (!fighterService.getBy({id})) {
                throw new Error("Fighter to delete not found");
            }
            res.data = fighterService.delete(req.params.id);
        } catch (err) {
            res.notFound = true;
            res.message = err.message;
        }
        next();
    },
    responseMiddleware
);

export {router};
