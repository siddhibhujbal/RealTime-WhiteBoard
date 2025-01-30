const socket = io("https://realtime-whiteboard-4on4.onrender.com");

// basic setup
const board=document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;
const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;

//function to change size
function sizeChange(value) {
    ctx.lineWidth = value;
    socket.emit("size", value);
}

//function to change tool
function handleLocaltoolChange(tool) {
    handleToolChange(tool);
    if (tool != "sticky");
    socket.emit("toolchange", tool);
}

//function for pencil color
function handleColorChange(color) {
    ctx.strokeStyle = color;
    socket.emit("color", color);
}

const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
    handleHamburger()
    socket.emit("hamburger");
});