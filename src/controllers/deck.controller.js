const { deckService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await deckService.create({ ...req.body, userId: id });
  return res.status(status).json(data);
};

const getAll = async (req, res) => {
  const { username, name, limit, page } = req.query;
  const { status, data } = await deckService.getAll({ quantity: limit, page }, username, name);
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await deckService.getById(id, req.user);
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, attributes } = req.body;
  const { status, data } = await deckService.update(id, name, attributes, req.user);
  return res.status(status).json(data);
};

const getDeckByUserId = async (req, res) => {
  const { userId } = req.params;
  const { status, data } = await deckService.getDeckByUserId(userId);
  return res.status(status).json(data);
};

module.exports = { create, getAll, update, getDeckByUserId, getById };
