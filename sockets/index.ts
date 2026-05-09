import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (_, res) => {
  res.send("Chat server running");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("message", (message) => {
    console.log("Message:", message);
    io.emit("message", {
      id: socket.id,
      text: message,
      time: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
