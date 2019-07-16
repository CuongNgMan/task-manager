import mongodb from "mongodb";
import { TASK, TASK_SCHEMA } from "../model/task.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

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
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling injectDB - ${error.message}`
      );
    }
  }

  static async getTasks() {
    try {
      const tasks = await taskModel.find({ isDeleted: false });
      return tasks;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] Error while getting all tasks ${error}`
      );
    }
  }

  static async getTask(task_id) {
    try {
      const task = await taskModel.findById(task_id).lean();
      return task;
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskDAO] error while getting task by ID: ${task_id} - ${error}`
      };
    }
  }

  static async createTask(new_task) {
    try {
      const createdTask = await taskModel.create(new_task);
      return createdTask;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while creating task ${new_task} - ${error}`
      );
    }
  }

  static async updateTask(task_id, update) {
    try {
      const updatedTask = await taskModel.findByIdAndUpdate(
        ObjectID(task_id),
        update,
        {
          lean: true,
          omitUndefined: false,
          new: true
        }
      );
      return updatedTask;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling updateTask ${error.message}`
      );
    }
  }

  static async removeTask(task_id) {
    try {
      await this.updateTask(task_id, { isDeleted: true });
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling removeTask ${error}`
      );
    }
  }

  static async taskCount() {
    try {
      return TaskModel.countDocuments();
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling taskCount ${error}`
      );
    }
  }
}

TaskDAO.getTask();
