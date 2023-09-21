const { body, validationResult } = require("express-validator");
const express = require("express");
const signupRouter = express.Router();
const { users } = require("../model/users");
const bcrybt = require("bcrypt");

signupRouter.post(
  "/signup",
  [
    body("username").isLength({ min: 5 }).isAlpha(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      req.body.password = await bcrybt.hash(req.body.password, 10);
      const newUser = req.body;
      const record = await users.create(newUser);
      res.status(201).json(record);
    } catch (err) {
      res.status(403).send("Error in creating user, try another username");
    }
  }
);

module.exports = signupRouter;
