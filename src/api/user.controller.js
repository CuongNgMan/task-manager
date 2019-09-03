import UserDAO from "../DAO/userDAO";
import { USER } from "../model/user.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

export default class UserController {
  static async apiGetAllUser(req, res, _next) {
    try {
      const users = await UserDAO.getUsers();
      if (users.errCode) {
        return res.status(users.errCode).send(users);
      }
      console.log("UserController", req.user);
      res.status(200).send(users);
    } catch (error) {
      return ErrorGenerateHelper(
        `[UserController] error while calling getAllUser - ${error.message}`
      );
    }
  }

  // Not use as of now
  static async apiGetUserById(req, res, _next) {
    try {
      const user = await UserDAO.getUserById(req.params.id);
      if (!user || user.errCode) {
        const message = ErrorGenerateHelper(`User cannot found`);
        return res.status(404).json(message);
      }
      res.status(200).send(user);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiGetUsersByID - ${error.message}`
      );
      console.log(message);
      res.status(500).json(message);
    }
  }

  static async apiAddUser(req, res, _next) {
    res.set("Content-Type", "application/json");
    try {
      const task = req.body;
      const result = await UserDAO.createUser(task);

      if (result.errCode) {
        return res.status(400).send(result);
      }
      const { user, token } = result;
      res.status(201).send({ message: "new user created", user, token });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiAddUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiUpdateUserProfile(req, res, _next) {
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
      const user = await UserDAO.updateUser(req.user.id, req.body);
      if (user.errCode) {
        return res.status(400).send(user);
      }
      res.status(200).send({ message: "new user updated", user });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiUpdateUserProfile - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiSoftDeleteUser(req, res, _next) {
    try {
      const result = await UserDAO.softDeleteUserByID(req.user._id);
      if (result.errCode) {
        return res.status(400).send(result);
      }
      res
        .status(200)
        .send({ message: `User with id: ${req.user._id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiRemoveUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiHardDeleteUser(req, res, _next) {
    try {
      const result = await UserDAO.hardDeleteUserById(req.user._id);

      if (result.value === null) {
        const message = ErrorGenerateHelper(
          `Cannot found specified user with id: ${req.user._id}`
        );
        return res.status(400).send(message);
      }

      res
        .status(200)
        .send({ message: `User with id :${req.user._id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[UserController] error while calling apiHardDeleteUser - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiLoginUser(req, res, _next) {
    try {
      const { email, password } = req.body;
      const result = await UserDAO.login(email, password);
      if (result && !result.errCode) {
        res.status(200).send({
          isValidUser: true,
          message: "User loged in successfully",
          token: result.token,
          user: result.user
        });
      } else {
        res.status(401).send({
          isValidUser: false,
          message: "Unauthorized"
        });
      }
    } catch (error) {
      res.status(500).send(message);
    }
  }

  static async apiLogoutUserAll(req, res, _next) {
    try {
      req.user.tokens.splice(0, req.user.tokens.length);
      await req.user.save();
      res.status(200).send({
        message: "Signed out"
      });
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  }

  static async apiLogoutUser(req, res, _next) {
    try {
      req.user.tokens = req.user.tokens.filter(t => {
        return t.token !== req.token;
      });
      await req.user.save();

      res.status(200).send({
        message: "Signed out",
        token: req.token
      });
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  }
}
