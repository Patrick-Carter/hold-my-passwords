const User = require("../../models/User");
const Encryptor = require("../../services/encryptor");

/*
  All endpoints that do not return a truthy value 
  will return true if the operation was successful
  and false otherwise.
  
  CREATE and GET
  return: truthy, or falsy.

  UPDATE and DELETE
  return: true, or false.
*/

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

        // make sure all user passwords are hashed before 
        // pushing to the database
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

      return true;
    } catch (err) {
      console.error("UserRepo Update Error: ", err);
      return false;
    }
  }

  async Delete(objInputs) {
    try {
      await User.destroy({
        where: {
          id: objInputs.id,
        },
      });

      return true;
    } catch (err) {
      console.error("UserRepo Delete Error: ", err);
      return false;
    }
  }
}

module.exports = UserRepo;
