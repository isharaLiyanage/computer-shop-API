const passport = require("passport");

const router = require("express").Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log("usr success");
    res
      .status(200)
      .json({ success: true, massage: "successful", user: req.user });
  } else {
    console.log("err");
    res.status(401).json("Not Authorized");
  }
});
router.get("/login/failed", (req, res) => {
  console.log("fail");
  res.status(401).json("Log in failure");
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect(process.env.CLIENT_URL);
  });
});
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
router.get("/protected", isLoggedIn, (req, res) => {
  res.send(req.user);
});
module.exports = router;
