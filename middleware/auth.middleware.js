const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "evaluation", (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.send({ msg: "You are not authorized" });
      }
    });
  } else {
    res.send({ msg: "Please log-in" });
  }
};

module.exports = { auth };
