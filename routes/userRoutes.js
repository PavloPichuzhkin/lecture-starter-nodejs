import {Router} from "express";
import {userService} from "../services/userService.js";
import {
    createUserValid,
    updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
    "/",
    (req, res, next) => {
        try {
            const fighters = userService.getAll(); //

            if (!fighters.length) {
                throw new Error("There are no Users in DB");
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
            const fighterById = userService.getById(req.params.id);

            if (!fighterById) {
                throw new Error("User not found");
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
    createUserValid,
    (req, res, next) => {
        if (!res.badRequest) {
            try {
                const {email, phoneNumber} = req.body;

                if (userService.search({email})) {
                    throw new Error("User with such email already exists");
                }
                if (userService.search({phoneNumber})) {
                    throw new Error("User with such phone number already exists");
                }
                res.data = userService.create(req.body);
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
    updateUserValid,
    (req, res, next) => {
        if (!res.badRequest) {
            try {
                const {email, phoneNumber} = req.body;
                const {id} = req.params;

                if (!userService.search({id})) {
                    throw new Error("User to update not found");
                }

                const updateByEmailCandidate = userService.search({email})

                if (updateByEmailCandidate && (updateByEmailCandidate.id !== id)) {
                    throw new Error("User with such email already exists");
                }

                const updateByPhoneCandidate = userService.search({phoneNumber})

                if (updateByPhoneCandidate && (updateByPhoneCandidate.id !== id)) {

                    throw new Error("User with such phone number already exists");
                }

                res.data = userService.update(id, req.body);
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
            if (!id) {
                throw new Error("Where is your fu ID");
            }

            if (!userService.getBy({id})) {
                throw new Error("User to delete not found");
            }
            res.data = userService.delete(req.params.id);
        } catch (err) {
            res.notFound = true;
            res.message = err.message;
        }
        next();
    },
    responseMiddleware
);


export {router};
