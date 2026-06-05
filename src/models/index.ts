import sequelize from "../config/database";
import User from "./User";
import Room from "./Room";
import Booking from "./Booking";

// Регистрируем модели
const models = { User, Room, Booking };

export { User, Room, Booking };
export default models;
