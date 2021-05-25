const jwt = require("jsonwebtoken");

class TokenSigner {
  Sign(data, expiredIn) {
    return jwt.sign(
      { data },
      `${"test"}`,
      { expiresIn: expiredIn }
    );
  }

  Decode(token) {
    return jwt.verify(token, "test");
  }
}

module.exports = TokenSigner;
