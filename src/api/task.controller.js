import TaskDAO from "../DAO/taskDAO";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";
import { TASK } from "../model/task.model";

export default class TaskController {
  static async apiGetTasks(req, res, _next) {
    try {
      const tasks = await TaskDAO.getTasks();
      if (tasks.errCode) {
        return res.status(400).send(tasks);
      }
      res.status(200).json({ ...tasks });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiGetTasks ${error}`
      );
      res.status(500).send(message);
    }
  }

  static async apiGetTaskByID(req, res, _next) {
    try {
      if (!req.params.id) {
        throw new Error("[TaskController] requested ID not found");
      }
      const task = await TaskDAO.getTaskByID(req.params.id);
      if (!task) {
        const message = ErrorGenerateHelper(`Task cannot found`);
        return res.status(404).send(message);
      }
      res.status(200).json(task);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiGetTaskByID - ${error}`
      );
      res.status(500).send(message);
    }
  }

  static async apiAddTask(req, res, _next) {
    try {
      let new_task = req.body;
      let user = req.user;
      const result = await TaskDAO.createTask({ ...new_task, owner: user._id });
      if (result.errCode) {
        return res.status(400).send(result);
      }
      res.status(201).send({ message: "new task created" });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiAddTask - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiUpdateTaskByID(req, res, _next) {
    const allowedProps = [...Object.getOwnPropertyNames(TASK)];
    const updatedProps = Object.keys(req.body);
    const isValidProp = updatedProps.every(prop => allowedProps.includes(prop));

    if (!isValidProp) {
      const message = ErrorGenerateHelper("Invalid update");
      return res.status(400).send(message);
    }

    res.set("Content-Type", "application/json");
    try {
      console.log(req.params.id);
      await TaskDAO.updateTaskByID(req.params.id, req.body).then(error => {
        if (error) {
          return res.status(400).send(error);
        }
      });
      res.status(200).send({ ok: 1 });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiUpdateTaskByID - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiSoftRemoveTaskByID(req, res, _next) {
    res.set("Content-Type", "application/json");

    try {
      const removedTask = await TaskDAO.updateTaskByID(req.params.id, {
        isDeleted: true
      });
      if (removedTask.errCode) {
        return res.status(400).send(removedTask);
      }
      res
        .status(200)
        .send({ message: `task with id: ${req.params.id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiSoftRemoveTaskByID - ${error.message}`
      );
      res.status(500).send(message);
    }
  }

  static async apiHardRemoveTaskByID(req, res, _next) {
    res.set("Content-Type", "application/json");
    try {
      const result = await TaskDAO.hardRemoveTaskByID(req.params.id);
      if (result.value === null) {
        const message = ErrorGenerateHelper(
          `Cannot found requested task id: ${req.params.id}`
        );
        return res.status(400).send(message);
      }
      res.status(200).send(`Task with id: ${req.params.id} removed`);
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiHardRemoveTaskByID - ${error.message}`
      );
      res.status(500).send(message);
    }
  }
}
