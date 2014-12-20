/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check wether current user is an admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.User && req.session.User.admin) {
    return next();
  } else {
    var error = [{name:"requireAdminError", message:"You must have admin privilleges to see this stuff."}]
    req.session.flash = {err:error, "class":"danger"};
    res.redirect("/session/new");
    return;
  }
};
