import TaskDAO from "../src/DAO/taskDAO";
import mongodb from "mongodb";
import { TASK } from "../src/model/task.model";

const ObjectId = mongodb.ObjectId;
const sampleTaskId = new ObjectId();

describe("TaskDAO should connect to DB and create new task", () => {
  beforeAll(async () => {
    await TaskDAO.injectDB(global.mongooseDB);
  });

  test("Create new task", async () => {
    console.log(`Create new task with _id: ${sampleTaskId}`);
    const sampleTask = {
      _id: sampleTaskId,
      [TASK.desc]: "daily task",
      [TASK.content]: "learn nodejs"
    };
    const createdTask = await TaskDAO.createTask(sampleTask);
    console.log(createdTask);
    const newTask = await TaskDAO.getTask(sampleTaskId);
    console.log(newTask);
    expect(newTask.content).toEqual("learn nodejs");
  });

  afterAll(async () => {
    await TaskDAO.removeTask(sampleTaskId);
  });
});
