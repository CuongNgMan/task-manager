import { TaskModel } from "../model/task.model";
import { UserModel } from "../model/user.model";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";

export default class TaskDAO {
  static async getTasks(user_id, options) {
    try {
      const user = await UserModel.findById(user_id);
      await user
        .populate({
          path: "tasks",
          ...options
        })
        .execPopulate();

      if (user.tasks.length !== 0) {
        return user.tasks;
      } else {
        return {
          message: "User does't have any task"
        };
      }
    } catch (error) {
      return ErrorGenerateHelper(`[TaskDAO] Error while getting all tasks ${error}`);
    }
  }

  static async getTaskByID(task_id, owner_id) {
    try {
      const task = await TaskModel.findOne({ _id: task_id, owner: owner_id });
      console.log("TCL: TaskDAO -> getTaskByID -> task", task);

      if (task.isDeleted) {
        return {
          message: "Task is no longer available"
        };
      }
      return task;
    } catch (error) {
      return ErrorGenerateHelper(`[TaskDAO] error while getting task by ID: ${user_id} - ${error}`);
    }
  }

  static async createTask(new_task) {
    try {
      const createdTask = await TaskModel.create(new_task);
      return createdTask;
    } catch (error) {
      return ErrorGenerateHelper(`[TaskDAO] error while creating task ${new_task} - ${error}`);
    }
  }

  static async updateTaskByID(task_id, new_task, owner_id) {
    try {
      const filter = { _id: task_id, owner: owner_id };
      const doc = { ...new_task };

      const task = await TaskModel.update(filter, doc, { runValidators: true });

      return task;
    } catch (error) {
      return ErrorGenerateHelper(`[TaskDAO] error while calling updateTask ${error.message}`);
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

  static async hardRemoveTaskByID(task_id, owner_id) {
    try {
      const result = await TaskModel.findOneAndRemove(
        { _id: task_id, owner: owner_id },
        { rawResult: true }
      );

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
      return ErrorGenerateHelper(`[TaskDAO] error while calling taskCount ${error}`);
    }
  }
}
