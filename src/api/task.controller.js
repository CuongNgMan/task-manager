import TaskDAO from "../DAO/taskDAO";

export default class TaskController {
  static async apiGetTasks(req, res, next) {
    try {
      const tasks = await TaskDAO.getTasks();
      if (tasks.errCode) {
        return res.send(tasks);
      }
      return res.json({ ...tasks });
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskController] apiGetTasks ${error}`
      };
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
        })
      }
      return res.json(task);
    } catch (error) {
      return {
        errCode: -1,
        errMsg: error
      };
    }
  }

  static async apiAddTask(new_task) {
    try {
      await TaskDAO.createTask(new_task);
    } catch (error) {
      return {
        errCode: -1,
        errMsg: `[TaskController] apiAddTask ${error}`
      };
    }
  }

  static async update(task_id) {}

  static async remove(task_id) {}
}
