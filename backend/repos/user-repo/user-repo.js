const User = require("../../models/User");

class UserRepo {
  async Create(objInputs) {
    return await User.create({
        email: objInputs.email,
        hashedPassword: objInputs.password
    })
  }

  Get(objInputs) {}

  Update(objInputs) {}

  Delete(objInputs) {}
}

module.exports = { UserRepo };
