import React, { useEffect, useRef, useState } from "react";
import bgImage from "../assets/bg.jpg";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";

const Chat = ({ socket }) => {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const userId = window.localStorage.getItem("userId"); // Ensure userId is available
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    socket.emit("join", userId);
  }, [socket, userId]);

  useEffect(() => {
    const handleNewMessages = (message) => {
      if (receiverId === message.sender) {
        setChats((prevState) => [
          ...prevState,
          { sender: message.sender, content: message.content },
        ]);
      }
    };

    socket.on("newMessage", handleNewMessages);

    // Cleanup function to avoid duplicate listeners
    return () => {
      socket.off("newMessage", handleNewMessages);
    };
  }, [socket, receiverId]);

  // Scroll to the bottom whenever the chats change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-lg flex flex-col md:flex-row md:w-3/4 md:h-[calc(100vh-60px)] w-full h-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Sidebar
          setChatInitiated={setChatInitiated}
          setChats={setChats}
          setReceiverId={setReceiverId}
        />
        <div className="flex-1 bg-white flex flex-col">
          {chatInitiated ? (
            <>
              <div className=" overflow-y-auto mb-20">
                {chats.length > 0 ? (
                  chats.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        chat.sender === userId ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 my-2 rounded ${
                          chat.sender === userId
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        } max-w-xs md:max-w-md`}
                      >
                        {chat.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center mt-4">No messages yet</p>
                )}
                <div ref={messagesEndRef} /> {/* Ref for scrolling */}
              </div>
              <Form receiverId={receiverId} setChats={setChats} chats={chats} />
            </>
          ) : (
            <div className="flex justify-center items-center flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                Start, Chat 👋
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
