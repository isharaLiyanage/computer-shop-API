const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const AuthHeader = req.headers.token;
  if (AuthHeader) {
    const token = AuthHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("TOKEN is not valid !");
      else {
        req.user = user;
      }
      next();
    });
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Not Allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Only Admin can do that");
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
