/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema:true,
  attributes: {
    name:{
      type:'string',
      required:true
    },
    title:{
      type:'string',
      required:true
    },
    username:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      email:true,
      required:true,
      unique:true
    },
    password:{
      type:'string'
    },
    hobby: {
      type:"string"
    },
    skills: {
      type:"string"
    },
    about:{
      type:"string"
    },
    toJSON:function() {
      var obj = this.toObject();
      delete obj.password;
      //delete obj.password_confirmation;
      //delete obj._csrf;
      return obj;
    }
  }
};

