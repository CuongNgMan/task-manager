let isDbConnected;

describe("Successfully connect to mongoDB", () => {
  beforeAll(async () => {
    isDbConnected = await global.mongooseDB.connections.length;
  });

  test("Connect to mongoDB", async () => {
    expect(isDbConnected).not.toEqual(0);
  });
});
