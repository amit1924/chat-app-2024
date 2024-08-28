// socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const onlineUsers = {};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};
io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Socket ID:", socket.id);

  socket.on("join", (receiverId) => {
    onlineUsers[receiverId] = socket.id;
    console.log("Receiver ID:", receiverId, "socket id:", socket.id);
  });
});

export { app, server, io };
