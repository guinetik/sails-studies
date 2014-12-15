/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new':function(req, res) {
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },

  'login':function(req, res) {
    res.view();
  },

  create:function(req, res, next) {
    User.create(req.params.all(), function userCreated(err, user){
      if(err){
        console.log("UserController.create", err);
        req.session.flash = {err:err};
        return res.redirect("user/new");
      }
      res.json(user);
      req.session.flash = {};
    });
  }

};
