const { validationResult } = require("express-validator");

const UserRepo = require("../../repos/user-repo/user-repo");
const HttpError = require("../../models/HttpError");
const Encryptor = require("../../services/encryptor");
const TokenSigner = require("../../services/token-signer");

const loginUserMock = async (req) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpError("Invalid inputs passed", 422);
    }

    const { email, password } = req.body;

    const repo = new UserRepo();
    const user = await repo.Get({ email: email });

    if (user === null) {
      throw new HttpError("invalid credentials", 422);
    }

    const encryptor = new Encryptor();
    const isValidPassword = await encryptor.Decrypt(
      password,
      user.dataValues.hashedPassword
    );

    if (!isValidPassword) {
      throw new HttpError("invalid credentials", 422);
    }

    const tokenSigner = new TokenSigner();
    const token = tokenSigner.Sign({ id: user.dataValues.id }, "1h");

    return {
      id: user.dataValues.id,
      token,
      message: "Login was successful",
    };
  } catch (err) {
    console.error("LOGIN ERROR: ", err);
  }
};

const signupMock = async (req) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty() || password !== confirmPassword) {
      throw new HttpError("Invalid inputs passed", 422);
    }

    const encryptor = new Encryptor();
    const hashedPassword = await encryptor.Encrypt(password);

    const repo = new UserRepo();
    const user = await repo.Create({ email, password: hashedPassword });

    if (user === null) {
      throw new HttpError("User could not be created", 401);
    }

    const tokenSigner = new TokenSigner();
    const token = tokenSigner.Sign({ id: user.dataValues.id }, "1h");

    return {
      id: user.dataValues.id,
      token,
      message: "Signup was successful",
    };
  } catch (err) {
    console.error("SIGNUP ERROR: ", err);
  }
};

module.exports = { loginUserMock, signupMock };
