import Joi from "joi";

import Roles from "../utils/roles";

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

export const updateUserRoleSchema = Joi.object({
  role: Joi.number().valid(Roles.USER, Roles.ADMIN).required(),
});
