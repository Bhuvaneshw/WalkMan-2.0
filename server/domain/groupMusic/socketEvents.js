export default function initSocketEvent(io) {
  io.on("connection", (socket) => {
    socket.on("createRoom", () => {
      const roomId = "test";
      socket.join(roomId);
      socket.emit("roomCreated", { roomId });
    });
    socket.on("joinRoom", () => {
      socket.join("test");
      socket.to("test").emit("userConnected", { userId: socket.id });
    });
    socket.on("connectionAccepted", ({ userId, roomDetail }) => {
      socket.to(userId).emit("connectionAccepted", { roomDetail });
    });
    socket.on("songSelected", ({ music }) => {
      socket.to("test").emit("songSelected", { music });
    });
    socket.on("play", ({ curTime }) => {
      socket.broadcast.to("test").emit("play", { curTime });
    });
    socket.on("pause", () => {
      socket.broadcast.to("test").emit("pause");
    });
    socket.on("audioSeeked", ({ curTime }) => {
      socket.broadcast.to("test").emit("audioSeeked", { curTime });
    });
  });
}
