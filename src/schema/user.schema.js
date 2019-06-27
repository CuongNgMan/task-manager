import m from "mongoose";
import validator from "validator";
import taskSchema from "./task.schema";

const Schema = m.Schema;

//Define schema
const userSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  age: {
    type: Number,
    required: true,
    max: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  pwd: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  tasks: {
    type: [taskSchema]
  }
});

//Define schema hooks
userSchema.path("email").validate(value => {
  return validator.isEmail(value);
});

export default userSchema;
