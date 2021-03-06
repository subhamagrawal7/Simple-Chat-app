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
  var patientDisease = $("#patient-disease");

  var database = firebase.database();

  firebase.auth().onAuthStateChanged(function(user) {
    username.val(user.email);
  });

  //Emit a username
  send_username.click(function() {
    socket.emit("change_username", { username: username.val() });
    message.prop("disabled", false);
    send_message.prop("disabled", false);
    
    database.ref("/" + patientDisease.val()).on("value", function(snapshot) {
      var obj = snapshot.val();
      const insertElement = document.querySelector('.docList');
      insertElement.textContent = "";
      for (var doctor in obj) {
        var nam = obj[doctor].name;
        //console.log(nam); 
        
        //console.log(insertElement);
        const markup = 
        `<li>
            <div id='single_doc'>
            <p>Name: <b>${nam}</b></p>
            <p>Email: <b>${obj[doctor].email}</b></p>
            </div>
            <hr>
          </li>
        `;
        insertElement.insertAdjacentHTML('beforeend', markup);
        // console.log(obj[doctor].email);
        // console.log(obj[doctor].name);
      }
    });
  });

  // enter is send
  message.keypress(e => {
    if (e.which === 13) {
      send_message.click();
    }
  });

  //Emit message
  send_message.click(function() {
    socket.emit("new_message", { message: message.val() });
    message.val("");
  });

  //Listen on new_message
  socket.on("new_message", data => {
    //console.log(data);
    chatroom.append(
      "<p class='message'>" + data.username + " : " + data.message + "</p>"
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
    //console.log("Yay, I got a message back from the server: ", msg);
    //handle the message however you would like
    // message.append($('<li>').text(msg));
    feedback.html("<p><i>" + msg + "</i></p>");
  });
});
