//IMPORT
import mongodb from "mongodb";
import mongoose from "mongoose";
import { USER_SCHEMA } from "../model/user.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

let userModel = mongoose.model("User", USER_SCHEMA);
const ObjectID = mongodb.ObjectId;

export default class UserDAO {
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

  static async createUser(new_user) {
    try {
      // const user = await userModel.create(new_user);
      // const token = await user.generateToken();
      // return { user, token };

      const result = await Promise.resolve({
        then: async (onFulfill, _) => {
          const user = await userModel.create(new_user);
          onFulfill(user);
        }
      }).then(async user => {
        const token = await user.generateToken();
        return { user, token };
      });

      return result;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling createUser(new_user) - ${error.message}`
      );
    }
  }

  static async updateUser(user_id, update) {
    try {
      // const updatedUser = await userModel.findByIdAndUpdate(
      //   ObjectID(user_id),
      //   update
      // );

      const updatedUser = await userModel.findById(user_id);
      const updateProp = Object.keys(update);
      updateProp.forEach(prop => {
        updatedUser[prop] = update[prop];
      });
      const user = await updatedUser.save();
      return user;
      // return updatedUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling updateUser(user_id, newUser) - ${error.message}`
      );
    }
  }

  static async softDeleteUserByID(user_id) {
    try {
      const removedUser = await this.updateUser(user_id, {
        isDeleted: true
      });

      return removedUser;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling softDeleteUserByID(user_id) - ${error.message}`
      );
    }
  }

  static async hardDeleteUserById(user_id) {
    try {
      const returnUserID = await userModel
        .findOneAndRemove({ _id: user_id }, { rawResult: true })
        .exec();

      return returnUserID;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling hardDeleteUserById(user_id) - ${error.message}`
      );
    }
  }

  static async login(email, password) {
    try {
      const user = await userModel.findByCredentials(email, password);
      const token = await user.generateToken();

      return { user, token };
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling login - ${error.message}`
      );
    }
  }
}
