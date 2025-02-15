import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, literal, Model } from "sequelize";
import sequelizeConnection from "../config/database";
import Rarity from "./Rarity.model";
import Deck from "./Deck.model";

class Card extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare image: string;
  declare rarityId: number;
  declare isTrunfo: boolean;
  declare attributeOne: number;
  declare attributeTwo: number;
  declare attributeThree: number;
  declare deckId: string;
}

Card.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      defaultValue: literal('gen_random_uuid()')
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rarityId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'rarity_id',
      references: {
        model: 'rarities',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    isTrunfo: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'is_trunfo',
    },
    attributeOne: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'attribute_one',
    },
    attributeTwo: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'attribute_two',
    },
    attributeThree: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'attribute_three',
    },
    deckId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'deck_id',
      references: {
        model: 'decks',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  },
  {
    sequelize: sequelizeConnection,
    underscored: true,
    timestamps: false,
    modelName: 'Card',
    tableName: 'cards',

  }
);

Card.belongsTo(Rarity, { as: 'rarity', foreignKey: 'rarityId', targetKey: 'id' });
Rarity.hasMany(Card, { as: 'cards', sourceKey: 'id', foreignKey: 'rarityId' });

Card.belongsTo(Deck, { as: 'deck', foreignKey: 'deckId', targetKey: 'id' });
Deck.hasMany(Card, { as: 'cards', foreignKey: 'deckId', sourceKey: 'id' });

export default Card;
