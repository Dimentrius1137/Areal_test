'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addConstraint(
      'Comments',
      {
        name: 'ArticleId',
        fields: ['ArticleId'],
        type: 'foreign key',
        references: {
          table: 'Articles',
          field: 'id'
        },
        onDelete: 'cascade'
      }
    );

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeConstraint('Comments', 'ArticleId');

  }
};
