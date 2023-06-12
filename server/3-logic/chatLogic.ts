import { execute } from "../1-dal/dalSql";
import { ChatInterface } from "../models/ChatInterface";

export async function saveChatMessage(chat: ChatInterface) {
  const { id, firstName, lastName, content, timestamp ,roomId,userId } = chat;
  const query = "INSERT INTO chat (id, firstName, lastName, content, timestamp ,roomId,userId) VALUES(?,?,?,?,?,?,?)";
  const results = await execute(query,[id,firstName,lastName,content,timestamp,roomId,userId]);
  console.log(results)
  return results;
}

export async function getChatMessagesByRoom(roomId:number){
    const query = 'SELECT * FROM chat WHERE roomId = ?'
    const [results] = await execute(query,[roomId]);
    return results;
}
