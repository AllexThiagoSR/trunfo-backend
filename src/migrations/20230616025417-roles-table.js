
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'roles',
      { 
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
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  },
};
