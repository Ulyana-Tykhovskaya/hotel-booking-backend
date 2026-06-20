import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || "hotel_booking",
  username: process.env.DB_USER || process.env.MYSQLUSER || "root",
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  dialect: "mysql" as const,
  logging: console.log, // ← ЛОГИРОВАНИЕ!
};

console.log("🔧 Sequelize Config:", {
  database: dbConfig.database,
  username: dbConfig.username,
  host: dbConfig.host,
  port: dbConfig.port,
});

const sequelize = new Sequelize(dbConfig);

export default sequelize;
