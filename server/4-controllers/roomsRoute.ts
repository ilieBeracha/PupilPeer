import express from "express";
import {
  createRoom,
  getRoomById,
  getRoomsByCategory,
  getRoomsBySubCategory,
  getUsersByRoom,
  removeUserFromRoom,
} from "../3-logic/roomsLogic";
import { VideoRoomsModal } from "../models/VideoRoomsModal";
import { getIdFromToken } from "../helpers/jwt";

export const RoomsRoute = express.Router();

RoomsRoute.post("/createRoom", async (req: any, res) => {
  const token = req.headers.authorization;

  const userId = await getIdFromToken(token);
  const roomData: VideoRoomsModal = req.body;

  const newRoomData: VideoRoomsModal = {
    hostUserId: Number(userId),
    roomName: roomData.roomName,
    description: roomData.description,
    categoryId: roomData.categoryId,
    subCategoryId: roomData.subCategoryId,
    maxParticipants: roomData.maxParticipants,
    isTeacher:roomData.isTeacher.toString(),
    cost:roomData.cost
  };
  console.log(newRoomData);

  try {
    const results = await createRoom(newRoomData);
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

RoomsRoute.get("/videoRooms", async (req, res) => {
  const categoryId: any = req.query.categoryId;
  try {
    const results = await getRoomsByCategory(+categoryId);
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

RoomsRoute.get("/videoRoomsSub", async (req, res) => {
  const subCategoryId: any = req.query.subCategoryId;
  try {
    const results = await getRoomsBySubCategory(+subCategoryId);
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

RoomsRoute.get("/room", async (req, res) => {
  const { roomId } = req.query;
  try {
    const results = await getRoomById(Number(roomId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

RoomsRoute.get("/room/users", async (req, res) => {
  const roomId: any = req.query.roomId;

  try {
    const results = await getUsersByRoom(+roomId);
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

RoomsRoute.post("/room/user/remove", async (req, res) => {
  const userId = Number(req.query.userId);
  const roomId = Number(req.query.roomId);
  try {
    const results = await removeUserFromRoom(roomId,userId);
    res.status(200).json(results)
  } catch (e) {
    res.status(401).json(e)
  }
});
