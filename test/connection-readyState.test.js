describe("Successfully connect to mongoDB", () => {
  beforeAll(async () => {
    await global.mongooseDB
      .openUri(process.env.__URI__, { useNewUrlParser: true })
      .then(client => {
        return client;
      });
  });

  test("Connect to mongoDB", async () => {
    const result = global.mongooseDB.readyState;
    expect(result).toEqual(1);
  });
});
