const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(receiverId);
    io.emit("getMessage", {
      senderId,
      receiverId,
      text
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});