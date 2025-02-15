'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('decks', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      attributeOne: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Attribute 1',
        field: 'attribute_one',
      },
      attributeTwo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Attribute 2',
        field: 'attribute_two',
      },
      attributeThree: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Attribute 3',
        field: 'attribute_three',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('decks');
  }
};
