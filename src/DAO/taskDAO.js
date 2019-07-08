import mongodb from "mongodb";
import { TASK, TASK_SCHEMA } from "../model/task.model";

const ObjectID = mongodb.ObjectId;

let taskModel;

export default class TaskDAO {
  static async injectDB(client) {
    if (taskModel) {
      return;
    }
    try {
      taskModel = client.model("Task", TASK_SCHEMA);
      this.taskModel = taskModel;
      return taskModel;
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while injecting DB ${error}`
      };
    }
  }

  static async getTasks() {
    try {
      const tasks = await taskModel.find({});
      return tasks;
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] Error while getting all tasks ${error}`
      };
    }
  }

  static async getTask(taskID) {
    try {
      const task = await taskModel.findById(taskID).lean();
      return task;
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while getting task by ID: ${taskID} - ${error}`
      };
    }
  }

  static async createTask(newTask) {
    try {
      await TaskModel.create(newTask);
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while creating task ${newTask} - ${error}`
      };
    }
  }

  static async updateTask(taskID, newTask) {}

  static async removeTask(taskID) {}

  static async taskCount() {
    try {
      return TaskModel.countDocuments();
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while calling taskCount ${error}`
      };
    }
  }
}

TaskDAO.getTask();
