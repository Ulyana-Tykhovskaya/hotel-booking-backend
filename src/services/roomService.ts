import { Room } from "../models";

export const getAllRooms = async () => {
  return await Room.findAll();
};

export const getRoomById = async (id: number) => {
  const room = await Room.findByPk(id);
  if (!room) {
    throw { status: 404, message: "Room not found" };
  }
  return room;
};

export const createNewRoom = async (data: any) => {
  const { room_number, type_room, price, capacity, description } = data;

  const existingRoom = await Room.findOne({ where: { room_number } });
  if (existingRoom) {
    throw { status: 400, message: "Room already exists" };
  }

  return await Room.create({
    room_number,
    type_room,
    price,
    capacity,
    description,
    is_available: true,
  });
};

export const updateRoom = async (id: number, data: any) => {
  const room = await Room.findByPk(id);
  if (!room) {
    throw { status: 404, message: "Room not found" };
  }

  return await room.update(data);
};

export const deleteRoom = async (id: number) => {
  const room = await Room.findByPk(id);
  if (!room) {
    throw { status: 404, message: "Room not found" };
  }

  await room.destroy();
};
