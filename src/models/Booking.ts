import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Booking extends Model {
  public id!: number;
  public user_id!: number;
  public room_id!: number;
  public check_in!: Date;
  public check_out!: Date;
  public adults!: number;
  public children!: number;
  public total_amount!: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    room_id: { type: DataTypes.INTEGER, allowNull: false },
    check_in: { type: DataTypes.DATE, allowNull: false },
    check_out: { type: DataTypes.DATE, allowNull: false },
    adults: { type: DataTypes.INTEGER, allowNull: false },
    children: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING(20), defaultValue: "pending" },
  },
  {
    sequelize,
    tableName: "Bookings",
    timestamps: true,
  },
);

export default Booking;
