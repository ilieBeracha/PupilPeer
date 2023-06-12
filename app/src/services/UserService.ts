import axios from "axios";
import { UserInterface } from "../models/UserModel";
import { BASE_URL } from "./config";

class UserService {
    async googleLogin(user: UserInterface) {
        const results = await axios.post(`${BASE_URL}/googlelogin`, user);
        return results;
    }
}

export const userService = new UserService();