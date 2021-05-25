const User = require("../../models/User");

class UserRepo {
  async Create(objInputs) {
    try {
      return await User.create({
        email: objInputs.email,
        hashedPassword: objInputs.password
    });
    } catch (err) {
      console.error("UserRepo Error", err);
      return null;
    }
    
  }

  Get(objInputs) {}

  Update(objInputs) {}

  Delete(objInputs) {}
}

module.exports = UserRepo;
