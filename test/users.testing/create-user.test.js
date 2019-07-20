import UserDAO from "../../src/DAO/userDAO";

import mongo from "mongodb";

const ObjectID = mongo.ObjectId;
const dumpUser_id = new ObjectID();

describe("UserDAO should connect to DB", () => {
  beforeAll(async () => {
    await UserDAO.injectDB(global.mongooseDB);
  });

  test("Create new user", async () => {
    
    const dumpUser = {
      _id: dumpUser_id,
      tasks: [
        "5d252f5cf917b6364c9cdba3",
        "5d252f71f84ad02c808f75c3",
        "5d25303e93f3d91024ab09be"
      ],
      name: "dumpUsername",
      age: "10",
      email: "useremail@gmail.com",
      pwd: "1234567890cc"
    };

    console.log(dumpUser.id);

    const createdUser = await UserDAO.createUser(dumpUser);
    console.log(createdUser);

    expect(createdUser.name).toEqual("dumpUsername");
  });

  afterAll(async () => {
    await UserDAO.removeUser(dumpUser_id);
  });
});
