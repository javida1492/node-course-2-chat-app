//--------------------------------- APIS -------------------------------------//
const path     = require("path");
const http     = require("http");
const express  = require("express");
const socketIO = require("socket.io");
//------------------------------ CONSTANTS -----------------------------------//
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;  //Configure port connection
//------------------------------ VARIABLES -----------------------------------//
var app = express();
var server = http.createServer(app);
var io = socketIO(server);            //configure socket to use our webserver
//----------------------------------------------------------------------------//
app.use(express.static(publicPath));

//This function lets us register an event listener for a new connection and respond to it
io.on("connection", (socket) => {
  console.log("New user connection");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "A new user has joined the chat!",
    createdAt: new Date().getTime()
  });

  /*socket.emit("newEmail", {
    from: "andrew@example.com",
    text: "This is a default msg",
    createdAt: 123
  });*/

  /*socket.emit("newMessage", {
    from: "Uri",
    text: "Is this a good trade?",
    createdAt: 123123
  });*/

  //================================================//
  // socket.emit emits an event to a single connection
  // io.emit emits an event to every connection
  //================================================//

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    /*socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });*/
  });

  /*(socket.on("createEmail", (newEmail) => {
    console.log("createEmail", newEmail);
  });*/

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});
//----------------------------------------------------------------------------//
server.listen(port, () => {
  console.log(`App started on port ${port}`);
});

//module.exports = {app};
