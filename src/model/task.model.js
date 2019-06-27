import db from "../db/conn";
import taskSchema from "../schema/task.schema";

//Create task model
const TaskModel = db.model("Task", taskSchema);

export default TaskModel;
