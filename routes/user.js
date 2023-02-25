const express = require("express");
const userRouter = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const { users } = require("../model/users");

userRouter.put("/userFav", bearerAuth, async (req, res) => {
  try {
    const user = req.user;
    const oldUser = await users.findOne({ where: { id: user.id } });
    await oldUser.update(req.body);
    res.status(200).json(oldUser);
  } catch (error) {
    res.status(403).send(error);
  }
});

userRouter.put("/userCart", bearerAuth, async (req, res) => {
  try {
    const user = req.user;
    const oldUser = await users.findOne({ where: { id: user.id } });
    await oldUser.update(req.body);
    res.status(200).json(oldUser);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = userRouter;
