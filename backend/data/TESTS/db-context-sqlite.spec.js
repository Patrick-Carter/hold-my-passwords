const dbContext = require("../db-context-sqlite");

describe("testing db context", () => {
  // setup
  const db = new dbContext.dbContext();
 
  test("dbContext should be initialized", () => {
    expect(db).toBeTruthy();
  });

  test("dbContext should be authed", async () => {
    const status = await db.testConnection();
    expect(status).toBe(true);
  });

  //teardown
  afterAll(async () => {
    await db.closeConnection();
  });
});
