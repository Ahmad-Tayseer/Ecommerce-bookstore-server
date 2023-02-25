const express = require("express");
const cors = require("cors");

const { sequelize } = require("./model/index");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");
const userRouter = require("./routes/user");
const bookRoute = require("./routes/book");
const contactRoute = require("./routes/contact");

const notFound = require("./error-handelers/404");
const error = require("./error-handelers/500");

app.get("/", (req, res) => {
  try {
    res.status(200).send("Welcome to my server");
  } catch (error) {
    res.status(403).send(error);
  }
});

app.use(signupRouter);
app.use(signinRouter);
app.use(userRouter);
app.use(bookRoute);
app.use(contactRoute);
app.use("*", notFound);
app.use(error);

sequelize.sync().then(
  app.listen(PORT, () => {
    console.log("Server is listining on port", PORT);
  })
);

module.exports = app;
