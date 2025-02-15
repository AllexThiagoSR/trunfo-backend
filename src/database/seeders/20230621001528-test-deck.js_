'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('decks',[
      {
        name: 'test',
        user_id: 1,
      },
      {
        name: 'test',
        user_id: 2,
      },
      {
        name: 'test',
        user_id: 1,
      },
      {
        name: 'test',
        user_id: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('decks', null, {});
  }
};
