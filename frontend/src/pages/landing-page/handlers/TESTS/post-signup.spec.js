import postSignup from "../post-signup";

describe("Testing all signup possibilities", () => {
  test("should return the newly created user", async () => {
    expect.assertions(1);

    const responce = await postSignup(
      "http://localhost:3030/api/v1/user/signup",
      {
        email: "testboi@test.com",
        password: "Testpassword123",
        confirmPassword: "Testpassword123",
      }
    );

    expect(responce).toBeTruthy();
  });
});
