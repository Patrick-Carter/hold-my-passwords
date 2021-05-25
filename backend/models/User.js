const { Sequelize, DataTypes, Model } = require("sequelize");

const dbConnector = require("../data/db-context-sqlite");
const db = new dbConnector.dbContext();

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db.getSequelize(),
    modelName: "User",
  }
);

db.getSequelize().sync({force: true});
module.exports = User;
