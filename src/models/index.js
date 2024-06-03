"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config/database";
const basename = path.basename(__filename);
const db = {};

export const connection = new Sequelize(config[process.env.NODE_ENV]);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default.init(connection, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.Sequelize = Sequelize;

module.exports = db;
