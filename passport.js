const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const User = require("./Models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK + "api/google/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log("existing");
          return done(null, profile);
        } else {
          console.log("Have user");
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
