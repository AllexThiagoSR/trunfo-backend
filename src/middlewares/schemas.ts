import Joi from "joi/lib";

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const updateDeckSchema = Joi.object({
  name: Joi.string().min(3).required(),
  attributes: Joi.array().items(Joi.string().min(3)).min(3).max(3)
    .required(),
});


const updateCardSchema = Joi.object({
  name: Joi.string().min(3).required(),
  attributes: Joi.array().items(Joi.number()).min(3).max(3)
    .required(),
  description: Joi.string().min(7).required(),
  image: Joi.string(),
  rarityId: Joi.number().required(),
  deckId: Joi.number().required(),
});

export default {
  updateDeckSchema,
  updateUserSchema,
  updateCardSchema,
};
