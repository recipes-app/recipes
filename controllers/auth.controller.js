const mongoose = require("mongoose");
const User = require("../models/user.model");
const passport = require("passport");

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

module.exports.doLogin = (req, res, next) => {};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate("google-auth", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate(
    "google-auth",
    (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        res
          .status(400)
          .render("users/login", { user: req.body, errors: validations });
      } else {
        req.login(user, (error) => {
          if (error) next(error);
          else res.redirect("/");
        });
      }
    }
  );

  passportController(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};


