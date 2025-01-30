const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle socket events
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("size", (size) => {
        socket.broadcast.emit("onsize", size);
    });

    socket.on("color", (color) => {
        socket.broadcast.emit("oncolor", color);
    });

    socket.on("toolchange", (tool) => {
        socket.broadcast.emit("ontoolchange", tool);
    });

    socket.on("hamburger", () => {
        socket.broadcast.emit("onhamburger");
    });

    socket.on("mousedown", (point) => {
        socket.broadcast.emit("onmousedown", point);
    });

    socket.on("mousemove", (point) => {
        socket.broadcast.emit("onmousemove", point);
    });

    socket.on("undo", () => {
        socket.broadcast.emit("onundo");
    });

    socket.on("redo", () => {
        socket.broadcast.emit("onredo");
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// // server side
// const express = require("express");
// // express server
// const app = express();
// //  nodejs
// const server = require("http").Server(app);
// // nodejs => socket enabled
// const path = require("path");
// const io = require("socket.io")(server);
// // serve static assets to client
// app.use(express.static("public"));

// // server
// io.on("connection", function(socket) {
//   socket.on("size", function(size) {
//     socket.broadcast.emit("onsize", size);
//   });
//   socket.on("color", function(color) {
//     socket.broadcast.emit("oncolor", color);
//   });

//   socket.on("toolchange", function(tool) {
//     socket.broadcast.emit("ontoolchange", tool);
//   });
//   socket.on("hamburger", function() {
//     socket.broadcast.emit("onhamburger");
//   });
//   socket.on("mousedown", function(point) {
//     socket.broadcast.emit("onmousedown", 
//     point);
//   });
//   socket.on("mousemove", function(point) {
//     socket.broadcast.emit("onmousemove", point);
//   });
//   socket.on("undo", function() {
//     socket.broadcast.emit("onundo");
//   });
//   socket.on("redo", function() {
//     socket.broadcast.emit("onredo");
//   });
// });
// // nodejs server
// const port = process.env.PORT || 3000;
// server.listen(port, function(req, res) {
//   console.log("Server has started at port 3000");
// });