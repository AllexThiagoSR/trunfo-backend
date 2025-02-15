import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  define: {
    underscored: true,
  },
  logging: (sql, time) => console.log(`LOG: ${sql} TIME: ${time}`),
});

export default sequelizeConnection
