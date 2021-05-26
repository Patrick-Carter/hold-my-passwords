const User = require("../../models/User");
const Encryptor = require("../../services/encryptor");

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
      if (objInputs.id) {
        return await User.findOne({
          where: {
            id: objInputs.id,
          },
        });
      } else {
        return await User.findOne({
          where: {
            email: objInputs.email,
          },
        });
      }
    } catch (err) {
      console.error("UserRepo Get Error", err);
      return null;
    }
  }

  async Update(objInputs) {
    try {
      if (objInputs.email) {
        await User.update(
          { email: objInputs.email },
          {
            where: {
              id: objInputs.id,
            },
          }
        );
      }

      if (objInputs.password) {
        const encryptor = new Encryptor();
        const hashedPassword = await encryptor.Encrypt(objInputs.password);

        await User.update(
          { hashedPassword: hashedPassword },
          {
            where: {
              id: objInputs.id,
            },
          }
        );
      }
    } catch (err) {
      console.error("UserRepo Update Error: ", err);
      return null;
    }
  }

  async Delete(objInputs) {}
}

module.exports = UserRepo;
