import m from "mongoose";
import validator from "validator";
import { taskSchema } from "./task.model";

export const USER = {
  id: "id",
  name: "name",
  age: "age",
  email: "email",
  pwd: "pwd",
  tasks: "tasks"
};

//Define schema
const Schema = m.Schema;
export const USER_SCHEMA = new Schema({
  [USER.id]: {
    type: Schema.Types.ObjectId
  },
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
  [USER.tasks]: {
    type: [taskSchema]
  }
});

//Define schema hooks
USER_SCHEMA.path("email").validate(value => {
  return validator.isEmail(value);
});
