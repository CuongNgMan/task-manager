import mongodb from "mongodb";
import mongoose from "mongoose";
import { TASK, TASK_SCHEMA } from "../model/task.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

const ObjectID = mongodb.ObjectId;

let taskModel = mongoose.model("Task", TASK_SCHEMA);

export default class TaskDAO {
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

  static async getTaskByID(task_id) {
    try {
      const task = await taskModel.findById(task_id, null, { lean: true });
      return task;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while getting task by ID: ${task_id} - ${error}`
      );
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

  static async updateTaskByID(task_id, update) {
    try {
      const updatedTask = await taskModel.findByIdAndUpdate(
        ObjectID(task_id),
        update,
        {
          lean: true,
          omitUndefined: false,
          new: true,
          runValidators: true
        }
      );
      return updatedTask;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling updateTask ${error.message}`
      );
    }
  }

  static async softRemoveTaskByID(task_id) {
    try {
      await this.updateTask(task_id, { isDeleted: true });
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling softRemoveTaskByID - ${error.message}`
      );
    }
  }

  static async hardRemoveTaskByID(task_id) {
    try {
      const result = await taskModel
        .findOneAndRemove({ _id: task_id }, { rawResult: true })
        .exec();

      return result;
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling hardRemoveTaskByID - ${error.message}`
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
