import m from "mongoose";
import validator from "validator";

export const USER = {
  id: "_id",
  name: "name",
  age: "age",
  email: "email",
  pwd: "pwd",
  tasks: "tasks",
  isDeleted: "isDeleted"
};

//Define schema
const Schema = m.Schema;
export const USER_SCHEMA = new Schema({
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
    type: []
  },
  [USER.isDeleted]: {
    type: Boolean,
    default: false
  }
});

//Define schema hooks
USER_SCHEMA.path("email").validate(value => {
  return validator.isEmail(value);
});
