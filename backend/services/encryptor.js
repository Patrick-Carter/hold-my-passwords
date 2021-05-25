const bcrypt = require("bcrypt");

class Encryptor {
  async Encrypt(string) {
    return await bcrypt.hash(string, 12);
  }

  async Decrypt(string, encryptedString) {
    return await bcrypt.compare(string, encryptedString);
  }
}

module.exports = Encryptor;
