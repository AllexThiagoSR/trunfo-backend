'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'rarities',
      [
        {
          name: 'Normal',
        },
        {
          name: 'Rara',
        },
        {
          name: 'Muito Rara',
        },
        {
          name: 'Épica',
        },
        {
          name: 'Lendária',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('rarities', null, {});
  }
};
