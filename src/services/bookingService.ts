import { Booking, User, Room } from "../models";

export const getAllBookings = async (userId: number) => {
  return await Booking.findAll({
    where: { user_id: userId },
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Room, attributes: ["id", "room_number", "type_room", "price"] },
    ],
  });
};

export const getBookingById = async (id: number) => {
  const booking = await Booking.findByPk(id, {
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Room, attributes: ["id", "room_number", "type_room", "price"] },
    ],
  });

  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }
  return booking;
};

export const createNewBooking = async (userId: number, data: any) => {
  const { room_id, check_in, check_out, adults, children } = data;

  const room = await Room.findByPk(room_id);
  if (!room) {
    throw { status: 404, message: "Room not found" };
  }

  const checkInDate = new Date(check_in);
  const checkOutDate = new Date(check_out);

  if (checkOutDate <= checkInDate) {
    throw { status: 400, message: "Check-out must be after check-in" };
  }

  const days = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const total_amount = (room.price as any) * days;

  return await Booking.create({
    user_id: userId,
    room_id,
    check_in: checkInDate,
    check_out: checkOutDate,
    adults,
    children: children || 0,
    total_amount,
    status: "pending",
  });
};

export const updateBooking = async (id: number, data: any) => {
  const booking = await Booking.findByPk(id);
  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }

  return await booking.update(data);
};

export const deleteBooking = async (id: number) => {
  const booking = await Booking.findByPk(id);
  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }

  await booking.destroy();
};
