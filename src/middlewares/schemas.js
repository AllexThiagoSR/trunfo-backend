const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string(),
});

const createDeckSchema = Joi.object({
  name: Joi.string().min(3).required(),
  attributeOne: Joi.string().min(3),
  attributeTwo: Joi.string().min(3),
  attributeThree: Joi.string().min(3),
});

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

const createCardSchema = Joi.object({
  name: Joi.string().min(3).required(),
  attributes: Joi.array().items(Joi.number()).min(3).max(3)
    .required(),
  description: Joi.string().min(7).required(),
  image: Joi.string(),
  rarityId: Joi.number().required(),
  isTrunfo: Joi.boolean().required(),
  deckId: Joi.number().required(),
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

module.exports = { 
  createUserSchema,
  updateDeckSchema,
  updateUserSchema,
  createCardSchema,
  createDeckSchema,
  updateCardSchema,
};
