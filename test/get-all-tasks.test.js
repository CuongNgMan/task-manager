import TaskDAO from "../src/DAO/taskDAO";
import m from "mongodb";

const ObjectID = m.ObjectId;

describe("Connect to DB and get task(s)", () => {
  beforeAll(async () => {
    await TaskDAO.injectDB(global.mongooseDB);
  });

  test("Getting all tasks which have prop isDeleted=false", async () => {
    try {
      const tasks = await TaskDAO.getTasks();
      console.log(tasks);
      const returnedType = Array.isArray(tasks);
      expect(returnedType).toEqual(true);
      expect(tasks.length).not.toEqual(0);
    } catch (error) {
      console.log(`[Testing] error while calling TaskDAO.getTasks() ${error}`);
    }
  });

  test("Getting task by id", async () => {
    try {
      const targetTaskID = "5d16f25fcf6bf71a808f71f0";

      const task = await TaskDAO.getTask(targetTaskID);
      console.log(`Getting task `);
      console.log(task);
      expect(task._id).toEqual(ObjectID(targetTaskID));
    } catch (error) {
      console.log(`[Testing] error while calling TaskDAO.getTask(ID) ${error}`);
    }
  });
});
