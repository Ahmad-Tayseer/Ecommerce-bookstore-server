const { users } = require("../model/users");
const jwt = require("jsonwebtoken");
const base64 = require("base-64");
const bcrybt = require("bcrypt");

users.authenticateBasic = async (email, password) => {
  const user = await users.findOne({ where: { email: email } });
  const valid = await bcrybt.compare(password, user.password);
  if (valid) {
    let token = jwt.sign({ email: user.email }, "TOKEN");
    user.token = token;
    return user;
  } else {
    throw new Error("Invalid User");
  }
};

async function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    const basicHeaderParts = req.headers.authorization.split(" ");
    const encodedString = basicHeaderParts.pop();
    const decodedString = base64.decode(encodedString);
    const [email, password] = decodedString.split(":");
    users
      .authenticateBasic(email, password)
      .then((validUser) => {
        req.user = validUser;
        next();
      })
      .catch((err) => {
        res.status(403).send("Invalid signin" + err);
      });
  }
}

module.exports = basicAuth;
