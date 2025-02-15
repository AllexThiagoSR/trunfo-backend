import { type CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelizeConnection from "../config/database";

class Role extends Model <InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<string>
  declare name: string
}

Role.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    sequelize: sequelizeConnection,
     modelName: 'Role',
     tableName: 'roles',
     underscored: true,
     timestamps: false
  }
)

export default Role