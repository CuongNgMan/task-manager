import UserDAO from "../../src/DAO/userDAO";

const targetID = "5d138d861d427733fcb70ba9";

describe("UserDAO should connect to db", () => {
  beforeAll(async () => {
    await UserDAO.injectDB(global.mongooseDB);
  });

  test("UserDAO call getUser and return target task", async () => {
    try {
      const user = await UserDAO.getUser(targetID);
      expect(user.userName).toEqual("test");
    } catch (error) {
      console.log(error);
    }
  });
});
