import TaskDAO from "../DAO/taskDAO";
import { ErrorGenerateHelper } from "../utils/ErrorGenerateHelper";
import { TASK } from "../model/task.model";

export default class TaskController {
  static async apiGetTasks(req, res, _next) {
    const LIMIT_RESULT_PER_PAGE = 5;

    const queries = {
      match: {},
      options: {}
    };

    if (req.query.completed) {
      queries.match = {
        completed: req.query["completed"]
      };
    }

    if (req.query.page) {
      queries.options = {
        limit: LIMIT_RESULT_PER_PAGE,
        skip: LIMIT_RESULT_PER_PAGE * (parseInt(req.query.page) - 1)
      };
    }

    try {
      let user = req.user;

      const tasks = await TaskDAO.getTasks(user._id, queries);
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
      const task_id = req.params.id;
      const owner_id = req.user._id;
      const task = await TaskDAO.getTaskByID(task_id, owner_id);
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
      const task_id = req.params.id;
      const new_task = req.body;
      const owner = req.user;

      const result = await TaskDAO.updateTaskByID(task_id, new_task, owner._id);
      if (result.errCode || result.n === 0) {
        return res.status(400).send({ message: "Invalid request" });
      }
      if (result.n === 1) {
        return res.status(200).send({ ok: 1, messsage: "Task updated" });
      }
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
      const task_id = req.params.id;
      const owner = req.user;

      const result = await TaskDAO.updateTaskByID(
        task_id,
        {
          isDeleted: true
        },
        owner
      );
      if (result.errCode) {
        return res.status(400).send({ result });
      }
      return res.status(200).send({ message: `task with id: ${task_id} removed` });
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
      const task_id = req.params.id;
      const owner = req.user;
      const result = await TaskDAO.hardRemoveTaskByID(task_id, owner);

      if (result.value === null) {
        const message = ErrorGenerateHelper(`Cannot found requested task id: ${task_id}`);
        return res.status(400).send(message);
      }
      return res.status(200).send({ ok: 1, message: `Task with id: ${task_id} removed` });
    } catch (error) {
      const message = ErrorGenerateHelper(
        `[TaskController] error while calling apiHardRemoveTaskByID - ${error.message}`
      );
      res.status(500).send(message);
    }
  }
}
