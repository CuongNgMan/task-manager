import UserDAO from "../DAO/userDAO";
import { USER } from "../model/user.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

export default class UserController {
  static async apiGetAllUser(req, res, next) {
    try {
      const users = await UserDAO.getUsers();
      if (users.errCode) {
        return res.status(users.errCode).send(users);
      }
      res.status(200).send(users);
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserController] error while calling getAllUser - ${error.message}`
      );
    }
  }

  static async apiGetUserById(req, res, next) {
    try {
      const user = await UserDAO.getUserById(req.params.id);
      if (!user || user.errCode) {
        const message = ErrorGenerateHelper(`User cannot found`);
        return res.status(404).json(message);
      }
      res.status(200).send(user);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiGetUsersByID - ${
          error.message
        }`
      );
      console.log(message);
      res.status(500).json(message);
    }
  }

  static async apiAddUser(req, res, next) {
    res.set("Content-Type", "application/json");
    try {
      const task = req.body;
      const createdUser = await UserDAO.createUser(task);
      if (createdUser.errCode) {
        return res.status(400).send(createdUser);
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
    const allowedProps = [...Object.getOwnPropertyNames(USER)];
    const updatedProps = Object.keys(req.body);
    const isValidUpdate = updatedProps.every(prop =>
      allowedProps.includes(prop)
    );

    res.set("Content-Type", "application/json");
    if (!isValidUpdate) {
      return res.status(400).send({ ok: -1, message: "invalid request" });
    }

    try {
      if (!req.params.id) {
        const message = ErrorGenerateHelper(`Request user id not specified`);
        return res.status(400).send(message);
      }
      const updatedUser = await UserDAO.updateUser(req.params.id, req.body);
      if (updatedUser.errCode) {
        return res.status(400).send(updatedUser);
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

  static async apiSoftDeleteUser(req, res, next) {
    try {
      if (!req.params.id) {
        const message = ErrorGenerateHelper(`Request user id not specified`);
        return res.status(400).send(message);
      }
      const removedUser = await UserDAO.softDeleteUserByID(req.params.id);
      if (removedUser.errCode) {
        return res.status(400).send(removedUser);
      }
      res
        .status(200)
        .send({ message: `User with id: ${req.params.id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiRemoveUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiHardDeleteUser(req, res, next) {
    try {
      if (!req.params.id) {
        const message = ErrorGenerateHelper(`Request user id not specified`);
        return res.status(400).send(message);
      }
      const result = await UserDAO.hardDeleteUserById(req.params.id);

      if (result.value === null) {
        const message = ErrorGenerateHelper(
          `Cannot found specified user with id: ${req.params.id}`
        );
        return res.status(400).send(message);
      }

      res
        .status(200)
        .send({ message: `User with id :${req.params.id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiHardDeleteUser - ${
          error.message
        }`
      );
      res.status(500).send(message);
    }
  }
}
