module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    'Card',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rarityId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      isTrunfo: DataTypes.BOOLEAN,
      attributeOne: DataTypes.INTEGER,
      attributeTwo: DataTypes.INTEGER,
      attributeThree: DataTypes.INTEGER,
      deckId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      tableName: 'cards',
      underscored: true,
      timestamps: false,
    },
  );
  
  Card.associate = ({ Deck, Rarity }) => {
    Card.belongsTo(Deck, { foreignKey: 'deckId', as: 'deck' });
    Card.belongsTo(Rarity, { foreignKey: 'rarityId', as: 'rarity' });
  };

  return Card;
};
