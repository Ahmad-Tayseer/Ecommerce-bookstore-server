const error = (err, req, res) => {
  res.status(500).send({
    code: 500,
    path: req.path,
    message: `Server error ${err.message}`,
  });
};

module.exports = error;
