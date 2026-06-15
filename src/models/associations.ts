import User from "./User";
import Room from "./Room";
import Booking from "./Booking";
User.hasMany(Booking, { foreignKey: "user_id" });
Room.hasMany(Booking, { foreignKey: "room_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Room, { foreignKey: "room_id" });
export default { User, Room, Booking };
