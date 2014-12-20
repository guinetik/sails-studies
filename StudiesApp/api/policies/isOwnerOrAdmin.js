/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check wether current user is an admin or is owner of the requested resource
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  var sessionUserMatchesId = req.session.User.id === parseInt(req.param("id"));
  var isAdmin = req.session.User.admin;
//  console.log(sessionUserMatchesId, isAdmin);
  if (!(sessionUserMatchesId || isAdmin)) {
    var error = [{name:"issuficientRightsError", message:"You don't have enough privileges to see this stuff."}]
    req.session.flash = {err:error, "class":"danger"};
    res.redirect("/session/new");
    return;
  }
  return next();
};
