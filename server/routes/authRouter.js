import express from "express";
import jwt from "jsonwebtoken";

import Users from "../models/Users.js";

import methodNotAllowedError from "../errors/methodNotAllowed.js";
import { auth } from "../middleware/auth.js";

import { JWT_SECRET, JWT_EXPIRY_IN_MILLISECONDS } from "../config.js";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRY_IN_MILLISECONDS}ms`,
  });
};

router.use((req, res, next) => {
  if (/\/signout/.test(req.path)) {
    return auth(req, res, next);
  }
  next();
});

router
  .route("/signin")
  .post((req, res) => {
    // Slowing down so that you can see if the button has been disabled
    setTimeout(() => {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send({
          message:
            "Pst! You are missing something in your request. Do you have a 'Content-Type' header and is it 'application/json?' Are you sending JSON? Is the username and password a part of the request?",
        });
      }

      const user = Users.findByCredentials(username, password);
      if (!user)
        return res.status(401).send({
          message: "Unauthorized. Your username or password is not correct.",
        });

      const userId = user.id.toString();

      return res.status(200).send({
        message: "You did it! Success!",
        token: generateToken(userId),
      });
    }, 500);
  })
  .all(methodNotAllowedError);

export default router;
