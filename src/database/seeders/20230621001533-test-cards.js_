'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cards', [
      {
        name: 'Test card 1',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 2',
        description: 'Another card to test the API',
        image: 'Card Image',
        rarity_id: 3,
        is_trunfo: true,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 3',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 4',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 5',
        description: 'Another card to test the API',
        image: 'Card Image',
        rarity_id: 3,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 6',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cards', null, {});
  }
};
