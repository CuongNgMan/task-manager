import m from "mongoose";

const Schema = m.Schema;

const taskSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  date: {
    type: Date,
    required: true
  }
});

//Schema hooks

export default taskSchema;
