import UserDAO from "../DAO/userDAO";

import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

export default class UserController {
  static async apiGetAllUser(req, res, next) {
    try {
      const users = await UserDAO.getUsers();
      if (users.errCode) {
        res.status(users.errCode).send(users);
      }
      res.status(200).send(users);
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserController] error while calling getAllUser - ${error.message}`
      );
    }
  }

  static async apiGetUserById(req, res, next) {
    res.set("Content-Type", "application/json");
    try {
      if (!req.params.id) {
        res.status(204).send();
      }

      const user = await UserDAO.getUser(req.params.id);
      if (user.errCode) {
        res.status(204).send();
      }

      res.status(200).send(user);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling - ${error.message}`,
        500
      );
      res.status(500).send(message);
    }
  }

  static async apiAddUser(req, res, next) {
    res.set("Content-Type", "application/json");
    try {
      const task = req.body;
      const createdUser = await UserDAO.createUser(task);
      if (createdUser.errCode) {
        res.status(400).send(createdUser);
      }
      res.status(201).send({ message: "new user created" });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiAddUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiUpdateUserProfile(req, res, next) {
    res.set("Content-Type", "application/json");
    try {
      const { id, new_user } = req.body;
      if (!id) {
        const message = ErrorGenerateHelper(`Request user id not specified`);
        res.status(400).send(message);
      }
      const updatedUser = await UserDAO.updateUser(id, new_user);
      if (updatedUser.errCode) {
        res.status(400).send(updatedUser);
      }
      res.status(200).send({ message: "new user updated" });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiUpdateUserProfile - ${
          error.message
        }`
      );
      res.status(500).send(message);
    }
  }

  static async apiRemoveUser(req, res, next) {
    try {
      const { id } = { ...req.body };
      if (!id) {
        const message = ErrorGenerateHelper(`Request user id not specified`);
        res.status(400).send(message);
      }
      const removedUser = await UserDAO.removeUser(id);
      if (removedUser.errCode) {
        res.status(400).send(removedUser);
      }
      res.status(200).send({ message: `User with id: ${id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiRemoveUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }
}
