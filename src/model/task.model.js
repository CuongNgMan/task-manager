import m from "mongoose";

const Schema = m.Schema;

export const TASK = {
  id: "userID",
  completed: "completed",
  desc: "desc",
  content: "content",
  date: "date"
};

const taskSchema = new Schema({
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

//Model
export default m.model("Task", taskSchema);

/*
const DB_NAME = "task-manager-api";
const DB_PORT = process.env.__DB_PORT__ || "27017";
const SERV_PORT = process.env.__SRV_PORT__ || "3000";

const URI = process.env.__URI__ || `mongodb://127.0.0.1:${DB_PORT}`;

const CONNECTION_STRING = `${URI}/${DB_NAME}`;
const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

m.connect(CONNECTION_STRING, CONNECT_OPTIONS).then(() => {
  newTask.save().then(err => {
    if (err) {
      console.log(`Error while saving: ${err}`);
    }

    console.log("New task saved");
  });
});
*/
