const express = require("express");

const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection handler
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);
