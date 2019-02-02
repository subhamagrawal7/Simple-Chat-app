var config = {
  apiKey: "AIzaSyBeobyef2FO8b3JsoaMFKrwvsryppmzBew",
  authDomain: "chatauth-840f3.firebaseapp.com",
  databaseURL: "https://chatauth-840f3.firebaseio.com",
  projectId: "chatauth-840f3",
  storageBucket: "",
  messagingSenderId: "854649559367"
};
firebase.initializeApp(config);

var email = $("#email");
var password = $("#password");
var logout = $("#logout");
var login = $("#login");
var loginDiv = $("#login-div");
var loggedInDiv = $("#loggedin-div");
var signUp = $("#signup");

login.click(function() {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.val(), password.val())
    .then(console.log("logged in"))
    .catch(function(error) {
      console.log(error);
    });
});

logout.click(function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("logged out");
    });
});

signUp.click(function() {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.val(), password.val())
    .catch(function(error) {
      console.log(error);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loginDiv.css("display", "none");
    loggedInDiv.css("display", "block");
  } else {
    loginDiv.css("display", "block");
    loggedInDiv.css("display", "none");
  }
});
