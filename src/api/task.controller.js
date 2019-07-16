import TaskDAO from "../DAO/taskDAO";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";
import { Collection } from "mongoose";

export default class TaskController {
  static async apiGetTasks(req, res, next) {
    try {
      const tasks = await TaskDAO.getTasks();
      if (tasks.errCode) {
        return res.status(400).send(tasks);
      }
      return res.status(200).json({ ...tasks });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiGetTasks ${error}`
      );
      res.status(500).send(message);
    }
  }

  static async apiGetTaskByID(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error("[TaskController] requested ID not found");
      }
      const task = await TaskDAO.getTask(req.params.id);
      if (!task) {
        return res.status(404).send({
          err: `[TaskController] no task found with ID ${req.params.id}`
        });
      }
      return res.status(200).json(task);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiGetTaskByID - ${error}`
      );
      res.status(500).send(message);
    }
  }

  static async apiAddTask(req, res, next) {
    try {
      const task = req.body;
      console.log(task);
      await TaskDAO.createTask(task).then((error, createdTask) => {
        if (error) {
          res.status(400).send(error);
        }
        console.log(createdTask);
        res.status(201).send();
      });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiAddTask - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiUpdateTaskByID(req, res, next) {
    res.set("Content-Type", "application/json");

    try {
      const task = req.body;
      await TaskDAO.updateTask(task._id, task.newtask).then(error => {
        if (error) {
          res.status(400).send(error);
        }
      });
      res.status(200).send({ ok: 1 });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiUpdateTaskByID - ${
          error.message
        }`
      );
      res.status(500).send(message);
    }
  }

  static async apiRemoveTaskByID(req, res, next) {
    res.set("Content-Type", "application/json");

    try {
      const task = req.body;
      await TaskDAO.updateTask(task.id, { isDeleted: true }).then(error => {
        if (error) {
          res.status(400).send(error);
        }
        res.status(200).send({ errCode: 0, errMessage: "Task deleted" });
      });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiRemoveTaskByID - ${error}`
      );
      res.status(500).send(message);
    }
  }
}
