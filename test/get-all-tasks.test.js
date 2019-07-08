import TaskDAO from "../src/DAO/taskDAO";
import m from "mongodb";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

const ObjectID = m.ObjectId;

describe("Connect to DB and get task(s)", () => {
  beforeAll(async () => {
    await global.mongooseDB
      .openUri(process.env.__URI__, { useNewUrlParser: true })
      .then(async client => {
        await TaskDAO.injectDB(client);
      });
  });

  test("Getting all tasks", async () => {
    try {
      const tasks = await TaskDAO.getTasks();
      console.log(tasks);
      const returnedType = Array.isArray(tasks);
      expect(returnedType).toEqual(true);
    } catch (error) {
      console.log(`[Testing] error while calling TaskDAO.getTasks() ${error}`);
    }
  });

  test("Getting task by id", async () => {
    try {
      const targetTaskID = ObjectID("5d16f25fcf6bf71a808f71f0");

      const task = await TaskDAO.getTask(targetTaskID);

      expect(task._id).toEqual(targetTaskID);
    } catch (error) {
      console.log(`[Testing] error while calling TaskDAO.getTask(ID) ${error}`);
    }
  });
});
