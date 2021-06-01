const bcrypt = require("bcrypt");

class Encryptor {
  async Encrypt(string) {
    try {
      return await bcrypt.hash(string, 12);
    } catch (err) {
      console.error("ENCRYPTOR ERROR: ", err);
    }
  }

  async Decrypt(string, encryptedString) {
    try {
      return await bcrypt.compare(string, encryptedString);
    } catch (err) {
      console.error("ENCRYPTOR ERROR: ", err);
    }
  }
}

module.exports = Encryptor;
