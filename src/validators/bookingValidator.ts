import Joi from "joi";

export const createBookingSchema = Joi.object({
  room_id: Joi.number().positive().required().messages({
    "number.positive": "Room ID must be positive",
    "any.required": "Room ID is required",
  }),
  check_in: Joi.date().iso().required().messages({
    "date.base": "Check-in must be a valid date",
    "any.required": "Check-in is required",
  }),
  check_out: Joi.date().iso().required().greater(Joi.ref("check_in")).messages({
    "date.base": "Check-out must be a valid date",
    "date.greater": "Check-out must be after check-in",
    "any.required": "Check-out is required",
  }),
  adults: Joi.number().positive().required().messages({
    "number.positive": "Adults must be positive",
    "any.required": "Adults is required",
  }),
  children: Joi.number().min(0).optional(),
});

export const updateBookingSchema = Joi.object({
  room_id: Joi.number().positive().optional(),
  check_in: Joi.date().iso().optional(),
  check_out: Joi.date().iso().optional(),
  adults: Joi.number().positive().optional(),
  children: Joi.number().min(0).optional(),
  status: Joi.string().valid("pending", "confirmed", "cancelled").optional(),
});
