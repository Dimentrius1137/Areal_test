'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Articles',
       [
        {
         articleName: 'article1',
         articleText: 'В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации создаёт необходимость включения в производственный план.',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        articleName: 'article2',
        articleText: 'Как принято считать, реплицированные с зарубежных источников, современные исследования неоднозначны и будут подвергнуты целой серии независимых исследований.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]
     );
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Articles', null, {});
     
  }
};
