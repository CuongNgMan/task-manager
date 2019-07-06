//IMPORT
import UserModel, { USER } from "../model/user.model";

let users;

export default class UserDAO {
  static async injectDB(client) {
    if (users) {
      return;
    }

    users = client.model("User");
    return users;
  }

  static async getUsers() {}

  static async getUser(id) {}

  static async createUser(newUser) {}
  
  static async updateUser(newUser) {}
}
