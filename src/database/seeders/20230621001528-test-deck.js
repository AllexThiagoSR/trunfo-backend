'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('decks',[
      {
        id: '3cba3a50-02bf-411e-95a0-2ad4c0f756a5',
        name: 'test 1',
        user_id: '6aedfcdb-d885-46d0-88e3-c1fd432ff297',
      },
      {
        id: '9c48b75d-792b-4420-9608-dc128712dbdc',
        name: 'test 2',
        user_id: '1b732db6-5c39-4f7a-9b32-c9a34455c478',
      },
      {
        id: 'a92ab75f-4566-40d9-806e-878b6530372f',
        name: 'test 3',
        user_id: '6aedfcdb-d885-46d0-88e3-c1fd432ff297',
      },
      {
        id: 'b8042af3-1c57-4499-8ade-69264ad56fb5',
        name: 'test 4',
        user_id: '1b732db6-5c39-4f7a-9b32-c9a34455c478',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('decks', null, {});
  }
};
