import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, literal, Model } from "sequelize";
import sequelizeConnection from "../config/database";
import User from "./User.model";

class Deck extends Model<InferAttributes<Deck>, InferCreationAttributes<Deck>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare attributeOne: CreationOptional<string>;
  declare attributeTwo: CreationOptional<string>;
  declare attributeThree: CreationOptional<string>;
  declare userId: string;
  declare created: CreationOptional<Date>;
}

Deck.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: literal('gen_random_uuid()'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attributeOne: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Attribute 1',
      field: 'attribute_one'
    },
    attributeTwo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Attribute 2',
      field: 'attribute_two'
    },
    attributeThree: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Attribute 3',
      field: 'attribute_three'
    },
    userId: {
      type: DataTypes.UUIDV4,
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP')
    }
  },
  {
    tableName: 'decks',
    modelName: 'Deck',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created',
    sequelize: sequelizeConnection,

  }
)

Deck.belongsTo(User, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Deck, { as: 'decks', foreignKey: 'userId', sourceKey: 'id' });

export default Deck;
