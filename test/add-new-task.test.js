import TaskDAO from "../src/DAO/taskDAO";

describe("Connecting to DB and create new task", () => {
  beforeAll(async () => {
    await global.mongooseDB
      .openUri(process.env.__URI__, { useNewUrlParser: true })
      .then(async client => {
        await TaskDAO.injectDB(client);
      });
  });

  test("Add new task", async () => {
    const returnedItem = await TaskDAO.createTask();
  });

  afterAll(async () => {});
});
