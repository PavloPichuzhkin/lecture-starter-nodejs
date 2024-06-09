import {Router} from "express";
import {authService} from "../services/authService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

router.post(
    "/login",
    (req, res, next) => {
        try {
            // TODO: Implement login action (get the user if it exist with entered credentials)

            const user = authService.login(req.body);

            if (!user) {
                throw new Error("User not found");
            }
            res.data = user
        } catch (err) {
            res.notFound = true;
            res.message = err.message
        } finally {
            next();
        }
    },
    responseMiddleware
);

export {router};
