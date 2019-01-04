var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  /*socket.emit("createEmail", {
    to: "uri@example.com",
    text: "This is a test msg"
  });*/

  /*socket.emit("createMessage", {
    from: "Andrew",
    text: "That works"
  });*/

});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

/*socket.on("newEmail", function (email) {
  console.log("New email", email);
});*/

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
