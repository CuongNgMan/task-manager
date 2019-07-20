//IMPORT
import mongodb from "mongodb";
import { USER_SCHEMA } from "../model/user.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

let userModel;
const ObjectID = mongodb.ObjectId;

export default class UserDAO {
  /**
   * @param {MongoDBClient} client - a mongodb client instance
   * @returns {Model} - a User model
   */
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

  /**
   * @returns {Object} - All current user
   */
  static async getUsers() {
    try {
      const users = await userModel.find({ isDeleted: false }, { __v: 0 });
      if (!Array.isArray(users) || users.length === 0) {
        return ErrorGenerateHelper(
          "Cannot retrieve any users from database",
          204
        );
      }
      return users;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] Error while calling getUsers() - ${error.message}`,
        500
      );
    }
  }

  /**
   * @param {ObjectID} user_id - user's id
   * @returns {Object} - an user information specfified by its id
   */
  static async getUserById(user_id) {
    try {
      const user = await userModel.findById(
        user_id,
        { __v: 0 },
        { lean: true }
      );
      return user;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling getUser(id) - ${error.message}`
      );
    }
  }

  /**
   * Create a new user
   * @param {Object} user_id - The User object
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

  /**
   * @param {ObjectID} user_id - The User object
   * @param {Object} update_user - a new property which apply for a user specified by user_id
   * @return {Object} - an updated user
   */
  static async updateUser(user_id, update) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        ObjectID(user_id),
        update,
        {
          lean: true,
          omitUndefined: false,
          new: true,
          runValidators: true
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

  /**
   * @param {ObjectID} user_id - The User object
   * @return {Object} - a deleted user
   */
  static async softDeleteUserByID(user_id) {
    try {
      const removedUser = await this.updateUser(user_id, {
        isDeleted: true
      });
      return removedUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling softDeleteUserByID(user_id) - ${
          error.message
        }`
      );
    }
  }

  /**
   * @param {ObjectID} user_id - The User object
   * @return {ObjectID} - an ObjectID from the deleted user
   */
  static async hardDeleteUserById(user_id) {
    try {
      const returnUserID = await userModel
        .findOneAndRemove({ _id: user_id }, { rawResult: true })
        .exec();

      return returnUserID;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling hardDeleteUserById(user_id) - ${
          error.message
        }`
      );
    }
  }
}
