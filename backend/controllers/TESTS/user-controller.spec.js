const UserController = require("../MOCKS/user-controller-mock");
const { globalContextSqlite } = require("../../data/db-context-sqlite");
const consoleSpy = jest.spyOn(console, "error").mockImplementation();

describe("testing user-controller", () => {
  beforeAll(async () => {
    await globalContextSqlite.getSequelize().sync({ force: true });
  });

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  test("should return a new user", async () => {
    expect.assertions(3);
    const newUser = await UserController.signupMock({
      body: {
        email: "testingUserController@test.com",
        password: "thisisatest1234",
        confirmPassword: "thisisatest1234",
      },
    });

    expect(newUser.id).toBeTruthy();
    expect(newUser.token).toBeTruthy();
    expect(newUser.message).toBe("Signup was successful");
  });

  test("should return a error because passwords do not match", async () => {
    expect.assertions(1);

    await UserController.signupMock({
      body: {
        email: "testingUserController@test.com",
        password: "thisisatest1234",
        confirmPassword: "DIFFERENT",
      },
    });

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("should return a user", async () => {
    expect.assertions(3);

    const loggedInUser = await UserController.loginUserMock(
      {
        body: {
          email: "testingUserController@test.com",
          password: "thisisatest1234",
        },
      },
      {}
    );

    expect(loggedInUser.id).toBeTruthy();
    expect(loggedInUser.token).toBeTruthy();
    expect(loggedInUser.message).toBe("Login was successful");
  });

  test("should be an invalid user", async () => {
    expect.assertions(1);

    await UserController.loginUserMock(
      {
        body: {
          email: "testingUserController@test.com",
          password: "WRONGPASSWORD",
        },
      },
      {}
    );

    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
