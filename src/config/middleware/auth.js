import jwt from "jsonwebtoken";
import { UserModel } from "../../model/user.model";

export const authentication = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      const decoded = await jwt.verify(token, "MYSECRETKEY");
      const user = await UserModel.findOne(
        {
          _id: decoded._id.toString(),
          "tokens.token": token
        },
        { tasks: 1, name: 1, age: 1, email: 1, tokens: 1 }
      );

      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).send({
        success: "False",
        message: `Token is not valid ${error}`
      });
    }
  } else {
    return res.status(400).send({
      success: "False",
      message: "Auth token is not supplied"
    });
  }
};
