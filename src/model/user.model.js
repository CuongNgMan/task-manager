import m from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TaskModel } from "./task.model";

export const USER = {
  id: "_id",
  name: "name",
  age: "age",
  email: "email",
  pwd: "pwd",
  tasks: "tasks",
  isDeleted: "isDeleted",
  tokens: "tokens"
};

//Define schema
const Schema = m.Schema;
export const USER_SCHEMA = new Schema(
  {
    [USER.name]: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    [USER.age]: {
      type: Number,
      required: true,
      max: 100
    },
    [USER.email]: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    [USER.pwd]: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    [USER.isDeleted]: {
      type: Boolean,
      default: false
    },
    [USER.tokens]: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

//Methods
USER_SCHEMA.methods.generateToken = async function(_cb) {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, "MYSECRETKEY", {
    issuer: "Cuong Srv",
    subject: "Task App",
    expiresIn: "1d"
  });

  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

USER_SCHEMA.methods.toJSON = function(_cb) {
  const user = this;
  const userObject = user.toObject();

  delete userObject.pwd;
  delete userObject.tokens;

  return userObject;
};

//Virtuals
USER_SCHEMA.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

//Static
USER_SCHEMA.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email: email });

  if (!user) {
    return {
      errCode: -1,
      errMessage: "Unable to login - Email not found"
    };
  }

  const isMatch = await bcrypt.compare(password, user.pwd);
  if (!isMatch) {
    return {
      errCode: -1,
      errMessage: "Unable to login - Wrong password"
    };
  }

  return user;
};

//Validation
USER_SCHEMA.path("email").validate(value => {
  return validator.isEmail(value);
});

//Hooks
USER_SCHEMA.pre("save", async function(next) {
  let user = this;
  //In case user changing password
  if (user.isModified("pwd")) {
    user.pwd = await bcrypt.hash(user.pwd, 10);
  }
  next();
});

USER_SCHEMA.pre("remove", async function(next) {
  let user = this;
  await TaskModel.deleteMany({ owner: user._id });
  next();
});

export const UserModel = m.model("User", USER_SCHEMA);
