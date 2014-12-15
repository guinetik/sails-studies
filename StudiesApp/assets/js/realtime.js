io.socket.get("/user/subscribe", function serverRespondedWith(body, jwr) {
  console.log(body);
});
io.socket.on("user", function(message){
  console.log("user", message);
  UserIndexPage.updateUserInDom(message.verb, message.data);
});

var UserIndexPage = {
  updateUser: function (data) {
    var userRow = $('tr[data-id="' + data.id + '"] td button').first();
    var userIcon = $('tr[data-id="' + data.id + '"] td button i').first();
    if(data.loggedIn) {
      userRow.removeClass("btn-default").addClass("btn-success");
      userIcon.removeClass("fa-ban").addClass("fa-check");
    } else {
      userRow.removeClass("btn-success").addClass("btn-default");
      userIcon.removeClass("fa-check").addClass("fa-ban");
    }
  },
  addUser: function (data) {
    console.log("add", data);
  },
  destroyUser: function (data) {
    $('tr[data-id="' + data.id + '"]').remove();
  },
  updateUserInDom:function(verb, data) {
    if(verb == "updated") UserIndexPage.updateUser(data);
    if(verb == "create") UserIndexPage.addUser(data);
    if(verb == "destroy") UserIndexPage.destroyUser(data);
  }
};
