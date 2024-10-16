'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Comments', [{
     commentText: 'Для современного мира синтетическое тестирование является качественно новой ступенью как самодостаточных, так и внешне зависимых концептуальных решений.',
     ArticleId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
      }]);
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Comments', null, {});
   
  }
};
