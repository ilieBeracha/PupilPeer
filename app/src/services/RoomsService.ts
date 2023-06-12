import axios from "axios";
import { VideoRoomsModal } from "../models/VideoRoomsModal";
import { BASE_URL } from "./config";

class RoomsService {
  getToken = () => {
    return localStorage.getItem("token");
  };
  async createRoom(roomData: VideoRoomsModal) {
    const token = this.getToken();
    const results = await axios.post(`${BASE_URL}/createRoom`, roomData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return results;
  }

  async getRoomsByCategory(categoryId: number) {
    const results = await axios.get(
      `${BASE_URL}/videoRooms?categoryId=${categoryId}`
    );
    return results.data;
  }

  async getRoomsBySubCategory(subCategoryId: number) {
    const results = await axios.get(
      `${BASE_URL}/videoRoomsSub?subCategoryId=${subCategoryId}`
    );
    return results.data;
  }

  async getRoomById(roomId: number) {
    const results = await axios.get(`${BASE_URL}/room?roomId=${roomId}`);
    return results.data;
  }

  async getUsersByRoom(roomId: number) {
    const results = (await axios.get(`${BASE_URL}/room/users?roomId=${roomId}`))
      .data;
    return results;
  }

  async removeUserFromRoom(userId: number, roomId: number) {
    const results = await axios.post(
      `${BASE_URL}/room/user/remove?userId=${userId}&roomId=${roomId}`
    );
    return results;
  }
}

export const roomsService = new RoomsService();
