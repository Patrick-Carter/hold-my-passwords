const { Sequelize } = require("sequelize");

class DbContextSqlite {
  constructor() {
    this.sequelize = new Sequelize(`sqlite::memory:`);
  }

  getSequelize() {
    return this.sequelize;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log(`Connection has been established to sqlite`);
      return true;
    } catch (err) {
      throw new Error("Connection failed", err)
    }
  }

  async closeConnection() {
    try {
      await this.sequelize.close();
    } catch (err) {
      throw new Error(err);
    }
  }
}

const globalContextSqlite = new DbContextSqlite();

module.exports = { globalContextSqlite };
