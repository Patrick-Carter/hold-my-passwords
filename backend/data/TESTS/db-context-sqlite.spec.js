const { globalContextSqlite } = require("../db-context-sqlite");

describe("testing db context", () => {
  // setup
  //const db = new dbContext();

  test("dbContext should be initialized", () => {
    expect(globalContextSqlite).toBeTruthy();
  });

  test("dbContext should be authed", async () => {
    const status = await globalContextSqlite.testConnection();
    expect(status).toBe(true);
  });

  //teardown
  afterAll(async () => {
    await db.closeConnection();
  });
});
