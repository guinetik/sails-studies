/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  new: function (req, res) {
    res.view();
  },
  login: function (req, res) {
    res.view();
  },
  create: function (req, res, next) {
    var params = req.params.all();
    delete params.id;
    User.create(params, function userCreated(err, user) {
      if (err) {
        console.log("UserController.create", err);
        req.session.flash = {err: err};
        return res.redirect("user/new");
      }
      //
      req.session.authenticated = true;
      req.session.User = user;
      //
      user.online = true;
      user.save(function(err, user) {
        if(err) return next(err);
        User.publishCreate(user);
        res.redirect("user/show/" + user.id);
      });
    });
  },
  me:function(req,res,next) {
    res.view("user/show", {user:req.session.User});
  },
  show: function (req, res, next) {
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  index: function (req, res, next) {
    var paging = false;
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      res.view({
        users: users,
        paging:paging
      });
    });
  },
  edit: function (req, res, next) {
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  update: function (req, res, next) {
    User.update(req.param("id"), req.params.all(), function userUpdated(err) {
      if (err) {
        return res.redirect('user/edit/' + req.param("id"));
      }
      res.redirect("/user/show/" + req.param("id"));
    });
  },
  destroy: function (req, res, next) {
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next("User doesnt exist");

      User.destroy(req.param("id"), function userDestroyed(err){
        if(err) return next(err);
        User.publishDestroy(user.id);
      });
      res.redirect("/user");
    })
  },
  subscribe:function(req,res, next) {
    User.find(function foundUsers(err, users) {
      if(err) return next(err);
      User.subscribe(req.socket, users);
      res.send(200);
    });
  }
};
