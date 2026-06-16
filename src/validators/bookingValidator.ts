import Joi from "joi";
export const createBookingSchema = Joi.object({
  user_id: Joi.number().positive().required().messages({
    "number.positive": "User ID must be positive",
    "number.base": "User ID must be a number",
  }),
  room_id: Joi.number().positive().required().messages({
    "number.positive": "Room ID must be positive",
  }),
  check_in: Joi.date().iso().required().messages({
    "date.base": "Check-in must be a valid date",
  }),
  check_out: Joi.date().iso().required().greater(Joi.ref("check_in")).messages({
    "date.base": "Check-out must be a valid date",
    "date.greater": "Check-out must be after check-in",
  }),
  adults: Joi.number().positive().required().messages({
    "number.positive": "Adults must be positive",
  }),
  children: Joi.number().min(0).optional(),
  total_amount: Joi.number().positive().required().messages({
    "number.positive": "Total amount must be positive",
  }),
  status: Joi.string().valid("pending", "confirmed", "cancelled").optional(),
});
export const updateBookingSchema = Joi.object({
  user_id: Joi.number().positive().optional(),
  room_id: Joi.number().positive().optional(),
  check_in: Joi.date().iso().optional(),
  check_out: Joi.date().iso().optional(),
  adults: Joi.number().positive().optional(),
  children: Joi.number().min(0).optional(),
  total_amount: Joi.number().positive().optional(),
  status: Joi.string().valid("pending", "confirmed", "cancelled").optional(),
});
