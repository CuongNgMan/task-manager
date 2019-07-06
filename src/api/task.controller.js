import TaskDAO from "../DAO/taskDAO";

export default class TaskController {
  static async getAll() {
    const tasks = TaskDAO.getTasks();
    
  }
  static async get(taskID) {}
  static async add(newTask) {}
  static async update(taskID) {}
  static async remove(taskID) {}
}

TaskController.getAll().then((err, res) => {
  console.log(err);
  console.log(res);
});
