const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../src/models/chat");

const getSecretRoom = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://dev-tinder-web-delta.vercel.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket connection");
    // Handle joinChat event
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoom(userId, targetUserId);
      console.log(firstName, "joining room: " + roomId);
      socket.join(roomId);
    });

    // Handle sendMessage event
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        const roomId = getSecretRoom(userId, targetUserId);

        try {
          let chat = await Chat.findOne({
            participants: {
              $all: [userId, targetUserId],
            },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();

          // Broadcast the message to the room
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("typing", ({ userId, targetUserId }) => {
      const roomId = getSecretRoom(userId, targetUserId);
      socket.to(roomId).emit("typing");
    });

    socket.on("stop typing", ({ userId, targetUserId }) => {
      const roomId = getSecretRoom(userId, targetUserId);
      socket.to(roomId).emit("stop typing");
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = initializeSocket;
