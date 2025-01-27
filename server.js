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
