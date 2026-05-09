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

const users = new Map<string, string>();

const messages: {
  user: string;
  text: string;
  time: string;
}[] = [];

app.get("/", (_, res) => {
  res.send("Chat server running");
});

app.get("/messages", (_, res) => {
  res.json(messages);
});

app.get("/users", (_, res) => {
  res.json([...users.values()]);
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username: string) => {
    users.set(socket.id, username);

    console.log(`${username} joined`);

    io.emit("system", `${username} joined the chat`);

    io.emit("users", [...users.values()]);
  });

  socket.on("message", (text: string) => {
    const username = users.get(socket.id) || "Anonymous";

    const message = {
      user: username,
      text,
      time: new Date().toLocaleTimeString(),
    };

    messages.push(message);

    if (messages.length > 50) {
      messages.shift();
    }

    console.log(message);

    io.emit("message", message);
  });

  socket.on("typing", () => {
    const username = users.get(socket.id);

    socket.broadcast.emit("typing", `${username} is typing...`);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);

    console.log("Disconnected:", username);

    users.delete(socket.id);

    io.emit("system", `${username} left the chat`);

    io.emit("users", [...users.values()]);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
