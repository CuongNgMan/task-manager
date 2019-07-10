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
      const createdTask = await taskModel.create(newTask);
      return createdTask;
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while creating task ${newTask} - ${error}`
      };
    }
  }

  static async updateTask(taskID, update) {
    try {
      await taskModel.findByIdAndUpdate(taskID, update, {
        lean: true,
        omitUndefined: false
      });
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while calling updateTask ${error}`
      };
    }
  }

  static async removeTask(taskID) {
    try {
      await this.updateTask(taskID, { isDeleted: true });
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while calling removeTask ${error}`
      };
    }
  }

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
