const User = require("../../models/User");

class UserRepo {
  async Create(objInputs) {
    try {
      return await User.create({
        email: objInputs.email,
        hashedPassword: objInputs.password,
      });
    } catch (err) {
      console.error("UserRepo Error", err);
      return null;
    }
  }

  async Get(objInputs) {
    try {
      return await User.findOne({
        where: {
          id: objInputs.id ?? objInputs.email,
        },
      });
    } catch (err) {
      console.error("UserRepo Get Error", err);
      return null;
    }
  }

  async Update(objInputs) {}

  async Delete(objInputs) {}
}

module.exports = UserRepo;
