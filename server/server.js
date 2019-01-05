//--------------------------------- APIS -------------------------------------//
const path     = require("path");
const http     = require("http");
const express  = require("express");
const socketIO = require("socket.io");
//------------------------------- LOCAL FUNCTIONS ----------------------------//
const {generateMessage, generateLocationMessage} = require("./utils/message");
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

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));

  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user has joined the chat!"));

  //================================================//
  // socket.emit emits an event to a single connection
  // io.emit emits an event to every connection
  //================================================//

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server");
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});
//----------------------------------------------------------------------------//
server.listen(port, () => {
  console.log(`App started on port ${port}`);
});
