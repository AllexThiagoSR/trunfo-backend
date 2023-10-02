'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards',{
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        rarityId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'rarity_id',
          references: {
            key: 'id',
            model: 'rarities'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        isTrunfo: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          field: 'is_trunfo'
        },
        attributeOne: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'attribute_one'
        },
        attributeTwo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'attribute_two'
        },
        attributeThree: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'attribute_three'
        },
        deckId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'deck_id',
          references: {
            model: 'decks',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cards');
  }
};
