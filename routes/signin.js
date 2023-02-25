const express = require("express");
const signinRouter = express.Router();
const basicAuth = require("../middlewares/basicAuth");

signinRouter.post("/signin", basicAuth, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = signinRouter;
