import Joi from "joi";
export const createRoomSchema = Joi.object({
  room_number: Joi.string().max(10).required().messages({
    "string.empty": "Room number is required",
  }),
  type_room: Joi.string().max(50).required().messages({
    "string.empty": "Room type is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be positive",
    "number.base": "Price must be a number",
  }),
  capacity: Joi.number().positive().required().messages({
    "number.positive": "Capacity must be positive",
  }),
  description: Joi.string().optional(),
  is_available: Joi.boolean().optional(),
});
export const updateRoomSchema = Joi.object({
  room_number: Joi.string().max(10).optional(),
  typr_room: Joi.string().max(50).optional(),
  price: Joi.number().positive().optional(),
  capacity: Joi.number().positive().optional(),
  description: Joi.string().optional(),
  is_available: Joi.boolean().optional(),
});
