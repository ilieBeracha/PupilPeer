import axios from "axios";
import { BASE_URL } from "./config";

class OpenaiService {
  async chatGptListener(content: string) {
    const results = await axios.post(`${BASE_URL}/openai/note`, { content });
    return results.data;
  }
}

export const openaiService = new OpenaiService();
