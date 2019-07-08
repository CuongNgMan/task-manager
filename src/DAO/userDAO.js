//IMPORT
import { USER_SCHEMA } from "../model/user.model";

let userModel;

export default class UserDAO {
  static async injectDB(client) {
    if (userModel) {
      return;
    }
    try {
      userModel = await client.model("User", USER_SCHEMA);
      return userModel;
    } catch (error) {
      console.log(`[UserDAO] error while injecting DB ${error}`);
    }
  }

  static async getUsers() {}

  static async getUser(id) {}

  static async createUser(newUser) {}

  static async updateUser(newUser) {}
}
