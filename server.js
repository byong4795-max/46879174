const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {

  socket.on("handData", (data) => {
    socket.broadcast.emit("handData", data);
  });

});

http.listen(3000, () => {
  console.log("http://localhost:3000");
});
