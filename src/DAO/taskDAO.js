import mongodb from "mongodb";
import { TASK, TASK_SCHEMA } from "../model/task.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

const ObjectID = mongodb.ObjectId;

let taskModel;

export default class TaskDAO {
  /**
   * @param {MongoDBClient} client - a mongodb client instance
   * @returns {Model} - a User model
   */
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

  /**
   * @returns {Object} - All current tasks
   */
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

  /**
   * @param {ObjectID} task_id - task's id
   * @returns {Object} - a task information specfified by its id
   */
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

  /**
   * Create a new user
   * @param {Object} task_id - The Task object
   * @returns {Object} - The newly created task
   */
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

  /**
   * @param {ObjectID} task_id - The Task object
   * @param {Object} update_task - a new property which apply for a task specified by task_id
   * @return {Object} - an updated task
   */
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

  /**
   * @param {ObjectID} task_id - The Task object
   * @return {Object} - a deleted task
   */
  static async softRemoveTaskByID(task_id) {
    try {
      await this.updateTask(task_id, { isDeleted: true });
    } catch (error) {
      return ErrorGenerateHelper(
        `[TaskDAO] error while calling softRemoveTaskByID - ${error.message}`
      );
    }
  }

  /**
   * @param {ObjectID} task_id - The Task object
   * @return {Object} - a deleted task
   */
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

  /**
   * @return {Number} - a total count of task
   */
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
