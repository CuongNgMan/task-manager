import m from "mongoose";
import mongo from "mongodb";

const ObjectId = m.Schema.Types.ObjectId;

export const TASK = {
  id: "_id",
  completed: "completed",
  desc: "desc",
  content: "content",
  date: "date",
  isDeleted: "isDeleted",
  owner: "owner"
};

const Schema = m.Schema;
export const TASK_SCHEMA = new Schema({
  [TASK.completed]: {
    type: Boolean,
    default: false
  },
  [TASK.desc]: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  [TASK.content]: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  [TASK.date]: {
    type: Date,
    default: Date.now()
  },
  [TASK.isDeleted]: {
    type: Boolean,
    default: false
  },
  [TASK.owner]: {
    type: ObjectId,
    require: true
  }
});

//Schema hooks

export const TaskModel = m.model("Task", TASK_SCHEMA);
