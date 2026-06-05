import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Room extends Model {
  public id!: number;
  public room_number!: string;
  public type_room!: string;
  public price!: number;
  public capacity!: number;
  public description?: string;
  public is_available!: boolean;
}

Room.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    room_number: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    type_room: { type: DataTypes.STRING(50), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: "Rooms", timestamps: true },
);

export default Room;
