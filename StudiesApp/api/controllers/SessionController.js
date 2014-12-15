/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require("bcrypt");
module.exports = {
  new: function (req, res) {
    res.view("session/new");
  },
  create: function (req, res, next) {
    if (!req.param("email") || !req.param("password")) {
      var error = [{name: "usernamePasswordRequired", message: "You must enter an email and a password"}];
      req.session.flash = {
        err: error
      };
      res.redirect("/session/new");
      return;
    }
    User.findOneByEmail(req.param("email"), function (err, user) {
      if (err) return next(err);
      if (!user) {
        var noAccountError = [{
          name: "noAccountError",
          message: "No user was found for the email " + req.param("email")
        }];
        req.session.flash = {
          err: noAccountError
        };
        res.redirect("/session/new");
        return;
      }
      bcrypt.compare(req.param("password"), user.password, function (err, valid) {
        if (err) return next(err);
        if (!valid) {
          var passwordMismatchError = [{
            name: "PasswordMismatchError",
            message: "Invalid username/password combination"
          }];
          req.session.flash = {
            err: passwordMismatchError
          };
          res.redirect("/session/new");
          return;
        }
        req.session.authenticated = true;
        req.session.User = user;
        user.online = true;
        user.save(function (err, user) {
          if (err) return next(err);
          User.publishUpdate(user.id, {loggedIn: true, id: user.id});
          if (req.session.User.admin) {
            // if the user is an admin, redirect to the user admin page
            res.redirect("/user");
            return;
          }
          res.redirect("/");
        });
      });
    });
  },
  destroy: function (req, res, next) {
    var userId = req.session.User.id;
    if (userId) {
      User.update(userId, {online: false}, function (err) {
        if (err) return next(err);
        User.publishUpdate(userId, {loggedIn: false, id: userId});
        req.session.destroy();
        res.redirect("/session/new");
      });
    } else {
      req.session.destroy();
      res.redirect("/session/new");
    }
  }
};
