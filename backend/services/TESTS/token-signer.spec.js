const TokenSigner = require("../token-signer");

describe("testing TokenSigner", () => {
  // setup
  const tokenSigner = new TokenSigner();

  test("should be able to generate valid token", () => {
    const token = tokenSigner.Sign({ test: "test" }, "1h");
    expect(token).toBeTruthy();
  });

  test("should be able to decode a given jwt", () => {
    const token = tokenSigner.Sign({ test: "test" }, "1h");
    const decodedToken = tokenSigner.Decode(token);
    expect(decodedToken.data.test).toBe("test");
  });
});
