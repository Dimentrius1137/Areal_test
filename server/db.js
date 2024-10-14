const Sequelize = require("sequelize");

module.exports.connect = new Sequelize('Areal_articles', 'postgres', '13579l13579l', {
    host: 'localhost',
    dialect: "postgres",
    logging: false
})