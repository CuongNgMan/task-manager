import m from "mongoose";

export const TASK = {
  id: "_id",
  completed: "completed",
  desc: "desc",
  content: "content",
  date: "date",
  isDeleted: "isDeleted"
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
  }
});

//Schema hooks
