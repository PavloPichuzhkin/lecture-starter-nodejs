import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
    "/",
    (req, res, next) => {
      try {
        const fighters = userService.getAll();

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
          const {name} = req.body;

          if (userService.getBy({name})) {
            throw new Error("Fighter with such name already exists");
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
          const {name} = req.body;
          const {id} = req.params;

          if (!userService.getBy({id})) {
            throw new Error("Fighter to update not found");
          }

          if (userService.getBy({name})) {
            throw new Error("Fighter with such name already exists");
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

        if (!userService.getBy({ id })) {
          throw new Error("Fighter to delete not found");
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


export { router };
