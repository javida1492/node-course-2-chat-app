//----------------------------------------------------------------------------//
//                            APIS
const socketIO = require("socket.io");
const path     = require("path");
const express  = require("express");
const http     = require("http");
//----------------------------------------------------------------------------//
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;  //Configure port connection
//----------------------------------------------------------------------------//
//                         VARIABLES
var app = express();
var server = http.createServer(app);
var io = socketIO(server);            //configure socket to use our webserver
//----------------------------------------------------------------------------//


app.use(express.static(publicPath));

//This function lets us register an event listener for a new connection and respond to it
io.on("connection", (socket) => {
  console.log("New user connection");

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});



//----------------------------------------------------------------------------//
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

module.exports = {app};
