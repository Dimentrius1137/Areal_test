'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Articles', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        articleName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        articleText: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        timestamps: true
      }
    );

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Articles');
 
  }
};