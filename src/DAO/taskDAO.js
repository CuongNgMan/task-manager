import TaskModel, { TASK } from "../model/task.model";
import mongodb from "mongodb";
import m from "mongoose";

const ObjectID = mongodb.ObjectId;

let taskDbCollection;

export default class TaskDAO {
  static async injectDB(client) {
    if (taskDbCollection) {
      return;
    }
    taskDbCollection = client.useDb("task-manager-api").collection("tasks");
    this.taskDbCollection = taskDbCollection;
    return taskDbCollection;
  }

  static async getTasks() {
    try {
      const tasks = await taskDbCollection.find({}).forEach(res => {
        
      })
      console.log(tasks);
    } catch (err) {
      return `Error while getting all tasks ${err}`;
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

TaskDAO.getTask();
