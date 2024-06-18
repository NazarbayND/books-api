import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publicationDate: Joi.date().required(),
  genres: Joi.array().items(Joi.string()).required(),
});
