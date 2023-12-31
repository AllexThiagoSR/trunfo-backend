module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'users',
    }
  );

  User.associate = ({ Role, Deck }) => {
    User.belongsTo(
      Role,
      {
        foreignKey: 'roleId',
        as: 'role'
      }
    );
    User.hasMany(Deck, { foreignKey: 'userId', as: 'decks' });
  };

  return User;
};
