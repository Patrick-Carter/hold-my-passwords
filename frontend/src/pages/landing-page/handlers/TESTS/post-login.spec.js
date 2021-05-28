import postLogin from "../post-login";

describe("Testing all signup possibilities", () => {
  test("should login and return a user", async () => {
    expect.assertions(1);

    const responce = await postLogin(
      "http://localhost:3030/api/v1/user/login",
      {
        email: "testboi@test.com",
        password: "Testpassword123",
      }
    );

    expect(responce).toBeTruthy();
  });
});
