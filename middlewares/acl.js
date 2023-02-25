module.exports = (capabilities) => {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(capabilities)) {
        next();
      } else {
        next("Access denies");
      }
    } catch (error) {
      next("Invalid login");
    }
  };
};
