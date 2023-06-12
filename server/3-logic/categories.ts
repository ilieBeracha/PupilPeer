import { execute } from "../1-dal/dalSql";

export async function getAllSubCategories(){
    const query = "SELECT * FROM pupilpeer.sub_categories";
    const [results] = await execute(query);
    return results
}