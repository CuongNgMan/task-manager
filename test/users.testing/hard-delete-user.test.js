import UserDAO from "../../src/DAO/userDAO";
import mongo from "mongodb";

const ObjectId = mongo.ObjectId;

describe("UserDAO should connect to DB and remove a user specified by id", () => {
  beforeAll(async () => {
    await UserDAO.injectDB(global.mongooseDB);
  });

  test("Remove user specified by id", async () => {
    const targetId = "5d33221141d69900d0a58c0a";
    const result = await UserDAO.hardDeleteUserById(targetId);
    console.log(result);
    expect(result.value).not.toBe(null);
  });

  test("Value property should be null if specified id is invalid or not found", async () => {
    const targetId = "5d33215541d69900d0a58abc";
    const result = await UserDAO.hardDeleteUserById(targetId);
    console.log(result);
    expect(result.value).toBe(null);
  });
});
