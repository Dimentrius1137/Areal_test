'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Comments', 'articleId',  {
          type: Sequelize.INTEGER,
          references: { model: 'Articles', key: 'id' },
        })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('articleId');
  }
};
