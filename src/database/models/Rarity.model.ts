import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelizeConnection from "../config/database";

class Rarity extends Model<InferAttributes<Rarity>, InferCreationAttributes<Rarity>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Rarity.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    }
  },
  {
    sequelize: sequelizeConnection,
    timestamps: false,
    underscored: true,
    tableName: 'rarities',
    modelName: 'Rarity'
  }
)

export default Rarity;
