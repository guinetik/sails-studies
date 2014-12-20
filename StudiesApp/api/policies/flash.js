/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy to send flash messages back and forth
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  res.locals.flash = {};
  if(!req.session.flash) {
      res.locals.flash = {};
      return next();
  }
  res.locals.flash = _.clone(req.session.flash);
  req.session.flash = {};
//  console.log("passing through flash policy");
  next();
};
