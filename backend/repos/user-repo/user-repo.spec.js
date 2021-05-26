const UserRepo = require("./user-repo");
const { globalContextSqlite } = require("../../data/db-context-sqlite");
const Encryptor = require("../../services/encryptor");

/*
    TESTS WITH:
    expect(newEmail).toBe("test@test2.com");
    expect(wasSuccessful).toBe(true);

    only add 100 MS to the tests and are more thorough
    if the DB exspands to the point that the test suite
    is taking to long this would be a good way to speed
    up testing without losing test integrity.
*/

describe("testing UserRepo object", () => {
  //set up
  const userRepo = new UserRepo();
  let userId = 0;

  beforeAll(async () => {
    await globalContextSqlite.getSequelize().sync({ force: true });
  });

  test("should make a new user", async () => {
    expect.assertions(2);

    const user = await userRepo.Create({
      email: "test@test.com",
      password: "Test123",
    });

    // get the id of the created user for further testing.
    userId = user.dataValues.id;

    // values for this test
    const email = user.dataValues.email;
    const password = user.dataValues.hashedPassword;

    expect(email).toBe("test@test.com");
    expect(password).toBe("Test123");
  });

  test("should get a user", async () => {
    expect.assertions(1);

    const findUser = await userRepo.Get({ email: "test@test.com" });

    expect(findUser).toBeTruthy();
  });

  test("should update a user email", async () => {
    expect.assertions(2);

    const wasSuccessful = await userRepo.Update({
      email: "test@test2.com",
      id: userId,
    });

    const user = await userRepo.Get({ email: "test@test2.com" });

    const newEmail = user.dataValues.email;

    expect(newEmail).toBe("test@test2.com");
    expect(wasSuccessful).toBe(true);
  });

  test("should update a user password", async () => {
    expect.assertions(2);

    const encryptor = new Encryptor();
    const wasSuccessful = await userRepo.Update({
      password: "testChange123$",
      id: userId,
    });

    const user = await userRepo.Get({ email: "test@test2.com" });

    const userEncryptedPassword = user.dataValues.hashedPassword;
    const isNewPasswordValid = await encryptor.Decrypt(
      "testChange123$",
      userEncryptedPassword
    );

    expect(isNewPasswordValid).toBe(true);
    expect(wasSuccessful).toBe(true);
  });

  test("should delete a user", async () => {
    expect.assertions(2);

    const wasSuccessful = await userRepo.Delete({ id: userId });

    const user = await userRepo.Get({ email: "test@test2.com" });

    expect(user).toBeFalsy();
    expect(wasSuccessful).toBe(true);
  });
});
