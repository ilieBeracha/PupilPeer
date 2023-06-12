import { VideoRoomsModal } from "../models/VideoRoomsModal";
import { execute } from "../1-dal/dalSql";

export async function createRoom(room: VideoRoomsModal) {
  let {
    roomName,
    description,
    hostUserId,
    categoryId,
    subCategoryId,
    startTime,
    maxParticipants,
    isTeacher,
    cost
  } = room;
  startTime = new Date().getTime();
  const query =
    "INSERT INTO videorooms(roomName,description,hostUserId,categoryId,subCategoryId,startTime,maxParticipants,isTeacher,cost) VALUES(?,?,?,?,?,?,?,?,?)";
  const results = await execute(query, [
    roomName,
    description,
    hostUserId,
    categoryId,
    subCategoryId,
    startTime,
    maxParticipants,
    isTeacher,
    cost
  ]);
  return results;
}

export async function getRoomsByCategory(categoryId: number) {
  const query = `
      SELECT v.*, s.subCategorieName, u.firstName AS hostUserName
      FROM videorooms v
      JOIN sub_categories s ON v.subCategoryId = s.id
      JOIN users u ON v.hostUserId = u.id
      WHERE v.categoryId = ?
    `;
  const [results] = await execute(query, [categoryId]);
  return results;
}

export async function getRoomsBySubCategory(subCategoryId: number) {
  const query = `
          SELECT v.*, s.subCategorieName, u.firstName AS hostUserName
          FROM videorooms v
          JOIN sub_categories s ON v.subCategoryId = s.id
          JOIN users u ON v.hostUserId = u.id
          WHERE v.subCategoryId = ?
        `;
  const [results] = await execute(query, [subCategoryId]);
  return results;
}

export async function getRoomById(roomId:number){
  const query = "SELECT * FROM videorooms WHERE id = ?"
  const [results] = await execute(query,[roomId]);
  return results
}

export async function addUsersToRoom(userId: number, roomId: number) {
  const checkIfUserExistInRoomQuery = "SELECT userId FROM videoroomsusers WHERE userId = ? AND roomId = ?";
  const [checkIfUserExistInRoomResults] = await execute(checkIfUserExistInRoomQuery, [userId, roomId]);

  if (checkIfUserExistInRoomResults.length > 0) {
    return; // User already exists in the room
  }

  const query = "INSERT INTO videoroomsusers (userId, roomId) VALUES (?, ?)";
  const results = await execute(query, [userId, roomId]);
  return results;
}


// export async function getUsersByRoom(roomId: number) {
//   const query = `
//     SELECT COUNT(*) as userCount
//     FROM users u
//     JOIN videoroomsusers vru ON u.id = vru.userId
//     WHERE vru.roomId = ?
//   `;
//   const [results] = await execute(query, [roomId]);
//   return results[0].userCount;
// }

export async function getUsersByRoom(roomId: number) {
  const query = `
    SELECT u.*
    FROM users u
    JOIN videoroomsusers vru ON u.id = vru.userId
    WHERE vru.roomId = ?
  `;
  const [results] = await execute(query, [roomId]);
  return results;
}



export async function removeUserFromRoom(roomId: number, userId: number) {
  const query = "DELETE FROM videoroomsusers WHERE roomId = ? AND userId = ?";
  const results = await execute(query, [roomId, userId]);
  return results;
}

