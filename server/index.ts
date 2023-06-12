import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { UserRoute } from "./4-controllers/userRoute";
import { CategoriesRoute } from "./4-controllers/categoriesRoute";
import { RoomsRoute } from "./4-controllers/roomsRoute";
import {
  addUsersToRoom,
  getUsersByRoom,
  removeUserFromRoom,
} from "./3-logic/roomsLogic";
import { saveChatMessage } from "./3-logic/chatLogic";
import { ChatRoute } from "./4-controllers/chatRoute";
import { OpenaiRoute } from "./4-controllers/openaiRoute";

dotenv.config();

const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

server.set("view engine", "ejs");
server.use(cors());
server.use(express.json());

server.use(UserRoute);
server.use(CategoriesRoute);
server.use(RoomsRoute);
server.use(ChatRoute);
server.use(OpenaiRoute);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

io.on("connection", (socket) => {
  socket.on("join-room", async (roomId, userId, userIdSub) => {
    await addUsersToRoom(userIdSub, +roomId);
    socket.join(roomId);
    const userCount = (await getUsersByRoom(+roomId)).length;

    io.emit("user-count", { roomId: roomId, userCount: userCount });

    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("send-message", async (message) => {
      saveChatMessage(message);
      socket.broadcast.to(roomId).emit("receive-message", message);
    });
    socket.on("disconnect", async () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
      await removeUserFromRoom(roomId, userIdSub);
      const userCount = (await getUsersByRoom(roomId)).length;
      io.emit("user-count", { roomId: roomId, userCount: userCount });

    });
  });
});
