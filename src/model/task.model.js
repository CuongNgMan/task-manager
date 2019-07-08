import m from "mongoose";

export const TASK = {
  id: "userID",
  completed: "completed",
  desc: "desc",
  content: "content",
  date: "date"
};

const Schema = m.Schema;
export const TASK_SCHEMA = new Schema({
  [TASK.id]: {
    type: Schema.Types.ObjectId
  },
  [TASK.completed]: {
    type: Boolean,
    required: true,
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
    required: true
  }
});

//Schema hooks
