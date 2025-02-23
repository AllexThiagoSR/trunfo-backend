'use strict';

const { hashSync } = require("bcryptjs");

const { ADM_PASSWORD } = process.env;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '6aedfcdb-d885-46d0-88e3-c1fd432ff297',
          username: 'Allek',
          email: 'allexthiagodev@gmail.com',
          password: hashSync(ADM_PASSWORD),
          role_id: 1
        },
        {
          id: '1b732db6-5c39-4f7a-9b32-c9a34455c478',
          username: 'Jão',
          email: 'jaodev@gmail.com',
          password: hashSync('1234567'),
          role_id: 2
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
