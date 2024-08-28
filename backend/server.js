import express from "express";
import cors from "cors";
import dbConnect from "./db/connection.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import MessageRouter from "./routes/message.js";
import { app, server } from "./socket/socket.js";

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/chat/user", AuthRouter);
app.use("/chat/users", UserRouter);
app.use("/chat/message", MessageRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  dbConnect();
  console.log(`Server listening on ${PORT}`);
});
