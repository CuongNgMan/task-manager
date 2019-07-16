import UserDAO from "../DAO/userDAO";




export default class UserController {
  static async getAllUser(req, res, next) {
    try {
      const users = await UserDAO.getUsers();
      if (users.errCode) {
        res.status(400).send(users);
      }
      res.status(200).send(users);
    } catch (error) {
      return {
        errCode: -1,
        errMessage: `[UserController] error while calling getAllUser - ${
          error.message
        }`
      };
    }
  }

  static async getUserById(id) {
    try {
      
    } catch (error) {
      return {
        errCode: -1,
        errMessage: `[UserController] error while calling `
      }
    }
  }

  static async addUser(newuser) {}

  static async updateUserProfile(userprofile) {}

  static async removeUser() {}
}
