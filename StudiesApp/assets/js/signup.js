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
$('#deleteModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  $('#delete_form').attr('action', "/user/destroy/" + recipient);
})
