import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connection", () => {
  console.log("Connected to server");
  console.log("Socket ID:", socket.id); // This should log the socket ID
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
};

export default App;
