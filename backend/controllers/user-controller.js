const UserRepo = require("../repos/user-repo/user-repo");
const HttpError = require("../models/HttpError");
const Encryptor = require("../services/encryptor");
const TokenSigner = require("../services/token-signer");

const loginUser = async (req, res, next) => {
  // validate inputs

  const { email, password } = req.body;

  const repo = new UserRepo();
  const user = await repo.Get({ email: email });

  if (user === null) {
    return next(new HttpError("invalid credentials", 422));
  }

  const encryptor = new Encryptor();
  const isValidPassword = await encryptor.Decrypt(
    password,
    user.dataValues.hashedPassword
  );

  if (!isValidPassword) {
    return next(new HttpError("invalid credentials", 422));
  }

  const tokenSigner = new TokenSigner();
  const token = tokenSigner.Sign({ id: user.dataValues.id }, "1h");

  return res.status(200).json({ token, message: "Login was successful" });
};

const signup = async (req, res, next) => {
  // validate inputs

  const { email, password } = req.body;

  const encryptor = new Encryptor();
  const hashedPassword = await encryptor.Encrypt(password);

  const repo = new UserRepo();
  const user = await repo.Create({ email, password: hashedPassword });

  if (user === null) {
    return next(new HttpError("User could not be created", 401));
  }

  const tokenSigner = new TokenSigner();
  const token = tokenSigner.Sign({ id: user.dataValues.id }, "1h");

  return res
    .status(201)
    .json({ user, token, message: "Signup was successful" });
};

module.exports = { loginUser, signup };
