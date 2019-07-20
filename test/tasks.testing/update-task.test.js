import TaskDAO from "../../src/DAO/taskDAO";

describe("TaskDAO should connect to DB and update a task", () => {
  beforeAll(async () => {
    await TaskDAO.injectDB(global.mongooseDB);
  });

  test("Update an existing task with ID 5d2606d10603c51b8cf0b28c", async () => {
    const taskId = "5d2606d10603c51b8cf0b28c";
    const updatedTask = await TaskDAO.updateTask(taskId, {
      desc: "weekly task"
    });
    console.log(updatedTask);
    expect(updatedTask.desc).toEqual("weekly task");
  });

  test("Update a non-existing task", async () => {
    const dumpTaskID = "5d2606d10603c51b8cf0b28c_123";
    let error = await TaskDAO.updateTask(dumpTaskID, {
      desc: "monthly task"
    });
    expect(error.error.message).toEqual()
  });
});
