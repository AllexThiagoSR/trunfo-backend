import { type CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, literal, Model } from "sequelize";
import sequelizeConnection from "../config/database";
import Role from "./Role.model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare image: string | null;
  declare roleId: CreationOptional<number>;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: literal('gen_random_uuid()'),
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id',
      defaultValue: 2,
      references: {
        key: 'id',
        model: 'roles',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'users',
    underscored: true,
    timestamps: false,
    modelName: 'User'
  }
);

User.belongsTo(Role, { as: 'role', foreignKey: 'roleId', targetKey: 'id' })
Role.hasMany(User, { as: 'users', foreignKey: 'roleId', sourceKey: 'id' })

export default User;
