
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'role_id',
          defaultValue: 2,
          references: {
            key: 'id',
            model: 'roles',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
