import express from "express";
import cors from "cors";
import http from "http";
const app = express();
import { Server } from "socket.io";

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PUT"],
  },
});
io.on("connection", (socket) => {
  socket.on("join", (data) => {
      socket.join(data.room)
    });
    
    socket.on("send", (data) => {
      io.to(data.room).emit("receive",data);
    });
});

server.listen(3001, () => console.log("SERVER RUNNING ON 3001"));
