$(document).ready(function(){
  $("#form-signin").validate({
    rules:{
      name:{
        required:true
      },
      title:{
        required:true
      },
      email:{
        required:true,
        email:true
      },
      password:{
        required:true,
        minlength:6
      },
      password_confirmation :{
        minlength:6,
        equalTo:"#password"
      }
    },
    success:function(element) {
      element.text("Ok").addClass("valid");
    }
  });
});
