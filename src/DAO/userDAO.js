//IMPORT
import { USER_SCHEMA } from "../model/user.model";
import mongodb from "mongodb";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

let userModel;
const ObjectID = mongodb.ObjectId;

export default class UserDAO {
  static async injectDB(client) {
    if (userModel) {
      return;
    }
    try {
      userModel = await client.model("User", USER_SCHEMA);
      return userModel;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while injecting DB ${error.message}`
      );
    }
  }

  static async getUsers() {
    try {
      const users = await userModel.find({ isDeleted: false });
      return users;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] Error while calling getUser() - ${error.message}`
      );
    }
  }

  static async getUser(user_id) {
    try {
      const user = await userModel.findById(user_id).lean();
      return user;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling getUser(id) - ${error.message}`
      );
    }
  }

  /**
   * Create a new user
   * @param {Object} new_user - The User object which contains id, name, age, email, pwd, tasks
   * @returns {Object} created User - The created user
   */
  static async createUser(new_user) {
    try {
      const createdUser = await userModel.create(new_user);
      return createdUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling createUser(new_user) - ${error.message}`
      );
    }
  }

  static async updateUser(user_id, update) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        ObjectID(user_id),
        update,
        {
          lean: true,
          omitUndefined: false
        }
      );
      return updatedUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling updateUser(user_id, newUser) - ${
          error.message
        }`
      );
    }
  }

  static async removeUser(user_id) {
    try {
      const removedUser = await UserDAO.updateUser(user_id, {
        isDeleted: true
      });
      return removedUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling removeUser(user_id) - ${error.message}`
      );
    }
  }
}
