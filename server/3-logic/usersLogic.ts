import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { UserInterface } from "../models/UserModel";

export async function getAllUsers() {
  const query = "SELECT * FROM users";
  const [results] = await execute(query);
  return results;
}

export async function googleLogin(user: UserInterface) {
  const { firstName, lastName, email, image } = user;
  const checkIfEmailExistQuery = `SELECT * FROM users WHERE email = ?`;
  const [emailResults] = await execute<OkPacket>(checkIfEmailExistQuery, [
    email,
  ]);
  if (emailResults.length > 0) {
    const getId = "SELECT id FROM users WHERE email = ?";
    const [idResults] = await execute<OkPacket>(getId, [email]);
    return idResults;
  } else {
    const query =
      "INSERT INTO users(firstName,lastName,email,image) VALUES(?,?,?,?)";
    const [results] = await execute<OkPacket>(query, [
      firstName,
      lastName,
      email,
      image,
    ]);
    user.id = results.insertId;
    return results;
  }
}
