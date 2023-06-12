import axios from "axios"
import { BASE_URL } from "./config"

class ChatService{
    async getChatMessagesByRoomId(roomId:number){
        const results = (await axios.get(`${BASE_URL}/chat?roomId=${roomId}`)).data;
        return results
    }
}

export const chatService = new ChatService()