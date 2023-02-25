const { users } = require("../model/users");
const jwt = require("jsonwebtoken");

users.authenticateBearer = async function (token) {
  const parsedToken = jwt.verify(token, "TOKEN");
  const user = await users.findOne({
    where: { email: parsedToken.email },
  });
  if (user.email) {
    return user;
  } else {
    throw new Error("Invalid Token");
  }
};

function bearerAuth(req, res, next) {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization.split(" ")[1];
    users
      .authenticateBearer(bearerToken)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch(() => {
        res.status(403);
        res.send("Invalid Token");
      });
  }
}

module.exports = bearerAuth;
