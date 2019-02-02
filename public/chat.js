$(function() {
  //make connection
  var socket = io.connect("https://simplechat998.herokuapp.com/");
  // var socket = io.connect('http://localhost:3000');

  //buttons and inputs
  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  var chatroom = $("#chatroom");
  var feedback = $("#feedback");

  //Emit a username
  send_username.click(function() {
    console.log(username.val());
    socket.emit("change_username", { username: username.val() });
    username.val("");
    window.alert(`User Name Successfully Changed.`);
  });

  //Emit message
  send_message.click(function() {
    socket.emit("new_message", { message: message.val() });
    message.val("");
  });

  //Listen on new_message
  socket.on("new_message", data => {
    console.log(data);
    chatroom.append(
      "<p class='message'>" + data.username + ": " + data.message + "</p>"
    );
  });

  //Listen on typing
  socket.on("typing", data => {
    feedback.html(
      "<p><i>" + data.username + " is typing a message..." + "</i></p>"
    );
  });

  //on io.emit from backend (notice 'chat message' event has same name as server side)
  socket.on("chat message", function(msg) {
    console.log("Yay, I got a message back from the server: ", msg);
    //handle the message however you would like
    // message.append($('<li>').text(msg));
    feedback.html("<p><i>" + msg + "</i></p>");
  });
});
