import axios from "axios";
import { BASE_URL } from "./config";

class CategoriesService {
  async getAllSubCategories() {
    const response = await axios.get(`${BASE_URL}/sub_categories`);
    return response.data;
  }
}

export const categoriesService = new CategoriesService();
