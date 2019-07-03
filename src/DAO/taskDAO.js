import TaskModel, { TASK } from "../model/task.model";
import mongodb from "mongodb";

let tasks;
const ObjectID = mongodb.ObjectId;

export default class TaskDAO {
  static async getTasks() {
    try {
      const tasks = await TaskModel.find({}).exec();
      return tasks;
    } catch (error) {
      return error;
    }
  }
  static async getTask(taskID) {
    try {
      const task = await TaskModel.find({ _id: new ObjectID(taskID) }).exec();
      return task;
    } catch (error) {
      return error;
    }
    return task;
  }
  static async createTask(newTask) {
    try {
      await TaskModel.create(newTask, err => {
        if (err) {
          console.log(`Error: ${err} \n while creating new task ${newTask}`);
          return err;
        }
      });
    } catch (error) {}
  }
  static async updateTask(taskID, newTask) {}
  static async removeTask(taskID) {}
  static async taskCount() {
    try {
      return TaskModel.countDocuments();
    } catch (err) {
      if (err) {
        console.log(`Error while ${err}`);
        return err;
      }
    }
  }
}
