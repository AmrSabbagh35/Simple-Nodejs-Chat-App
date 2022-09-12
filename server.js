const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const port = 3000 || process.env.port;
const server = http.createServer(app);
const io = socketio(server);

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

const botname = "Chattie Bot";
// runs when a client connects

io.on("connection", (socket) => {
  // welcoming the users
  socket.emit("message", formatMessage(botname, "Welcome to Chattie"));
  // broadcasts when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botname, "a user has joined the chat")
  );

  // runs when client disconnects

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botname, "a user has left the chat"));
  });

  //listen for chat messages
  socket.on("chatmessage", (msg) => {
    io.emit("message", formatMessage("User", msg));
  });
});

server.listen(port, () => console.log(`server running on port ${port}`));
