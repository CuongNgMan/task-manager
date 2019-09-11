//IMPORT
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";
import { UserModel } from "../model/user.model";

export default class UserDAO {
  static async getUsers() {
    try {
      const users = await UserModel.find({ isDeleted: false }, { __v: 0 });
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
      const user = await UserModel.findById(
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
      // const user = await UserModel.create(new_user);
      // const token = await user.generateToken();
      // return { user, token };

      const result = await Promise.resolve({
        then: async (onFulfill, _) => {
          const user = await UserModel.create(new_user);
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
      // const updatedUser = await UserModel.findByIdAndUpdate(
      //   ObjectID(user_id),
      //   update
      // );

      const updatedUser = await UserModel.findById(user_id);
      const updateProp = Object.keys(update);
      updateProp.forEach(prop => {
        updatedUser[prop] = update[prop];
      });
      const user = await updatedUser.save();
      return user;
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

  static async hardDeleteUserById(user) {
    try {
      const returnUserID = await user.remove();

      return returnUserID;
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling hardDeleteUserById(user_id) - ${error.message}`
      );
    }
  }

  static async login(email, password) {
    try {
      const user = await UserModel.findByCredentials(email, password);
      const token = await user.generateToken();

      return { user, token };
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserDAO] error while calling login - ${error.message}`
      );
    }
  }
}
