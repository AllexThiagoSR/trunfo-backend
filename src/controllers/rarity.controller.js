const { rarityService } = require('../services');

const getAll = async (_req, res) => {
  const { status, data } = await rarityService.getAll();
  return res.status(status).json(data);
};

module.exports = { getAll };
