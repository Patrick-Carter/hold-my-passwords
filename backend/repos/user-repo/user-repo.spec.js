const UserRepo = require("./user-repo");


describe("testing UserRepo object", () => {
  //set up
  const userRepo = new UserRepo();

  test("should make a new user", async () => {
    expect.assertions(2)

    const user = await userRepo.Create({
      email: "test@test.com",
      password: "Test123",
    });

    expect(user.email).toBe("test@test.com");
    expect(user.password).toBe("Test123");
  });

 
});
