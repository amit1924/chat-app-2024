import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const router = express.Router();

// Apply middleware to verify the user before any routes
router.use(verifyUser);

// Route to read messages between the sender and receiver
router.get("/read/:receiverId", async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderID = req.user._id;

    // Find the conversation between the sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderID, receiverId] },
    });

    if (!conversation) {
      // If no conversation is found, send a 404 response
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Fetch messages associated with the conversation
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 }); // Sort messages by creation time

    // Send the messages back to the client
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving messages" });
  }
});

router.post("/send/:receiverId", async (req, res) => {
  const { receiverId } = req.params;
  const senderID = req.user._id; // Ensure `verifyUser` middleware sets `req.user`
  const { content } = req.body;

  try {
    // Find existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderID, receiverId] },
    });

    // If no conversation found, create a new one
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderID, receiverId], // Corrected to an array
      });

      await conversation.save();
    }

    // Create a new message
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderID,
      content,
      createdAt: new Date(), // Date is automatically created on server
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with the new message
    return res.json(newMessage);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
  }
});

export default router;
