const notFound = (req, res) => {
  res.status(404).send({
    code: 404,
    path: req.path,
    message: "Page not found",
  });
};

module.exports = notFound;
