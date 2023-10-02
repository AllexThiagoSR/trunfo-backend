const { Rarity } = require('../models');

const INTERNAL_ERROR = { status: 500, data: { message: 'Internal server error' } };
const getAll = async () => {
  try {
    const rarities = await Rarity.findAll();
    return { status: 200, data: rarities };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { getAll };
