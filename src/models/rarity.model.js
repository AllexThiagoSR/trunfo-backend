module.exports = (sequelize, DataTypes) => {
  const Rarity = sequelize.define(
    'Rarity',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'rarities',
      undesrcored: true,
      timestamps: false,
    }
  );

  Rarity.associate = ({ Card }) => {
    Rarity.hasMany(Card, { foreignKey: 'rarityId', as: 'cards' });
  };

  return Rarity;
};

