const UserRepo = require("./user-repo");
const { globalContextSqlite } = require("../../data/db-context-sqlite");
const Encryptor = require("../../services/encryptor");

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
    expect.assertions(1);

    await userRepo.Update({ email: "test@test2.com", id: userId });

    const user = await userRepo.Get({ email: "test@test2.com" });

    const newEmail = user.dataValues.email;

    expect(newEmail).toBe("test@test2.com");
  });

  test("should update a user password", async () => {
    expect.assertions(1);

    const encryptor = new Encryptor();
    await userRepo.Update({ password: "testChange123$", id: userId });

    const user = await userRepo.Get({ email: "test@test2.com" });

    const userEncryptedPassword = user.dataValues.hashedPassword;
    const isNewPasswordValid = await encryptor.Decrypt(
      "testChange123$",
      userEncryptedPassword
    );

    console.log(isNewPasswordValid);

    expect(isNewPasswordValid).toBe(true);
  });
});
