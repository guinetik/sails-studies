/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true,
      unique:true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    admin:{
      type:"boolean",
      defaultsTo:false
    },
    online:{
      type:"boolean",
      defaultsTo:false
    },
    password: {
      type: 'string',
      required: true
    },
    hobby: {
      type: "string",
      required: false
    },
    skills: {
      type: "string",
      required: false
    },
    about: {
      type: "string",
      required: false
    }
  },
  beforeCreate:function(values, next) {
    if(!values.password || values.password != values.password_confirmation) {
      return next({err:["The passwords doesnt match"]});
    }
    require("bcrypt").hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if(err) return next(err);
      values.password = encryptedPassword;
      next();
    });
  },
  toJSON: function () {
    var obj = this.toObject();
    delete obj.password;
    //delete obj.password_confirmation;
    //delete obj._csrf;
    return obj;
  }
};

