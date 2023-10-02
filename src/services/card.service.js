const { Op, QueryTypes } = require('sequelize');
const { Card, Deck, sequelize, Rarity } = require('../models');

const INTERNAL_ERROR = { status: 500, data: { message: 'Internal server error' } };
const { URL_PROTOCOL, URL_BASE } = process.env;

const deckExists = async (deckId) => Boolean(await Deck.findByPk(deckId));

const hasTrunfo = async ({ deckId, isTrunfo }) => isTrunfo && Boolean(
  await Card.findOne({ where: { deckId, isTrunfo: true } }),
);

const attributesIsOk = ({ attributes }) => {
  const maxSum = 210;
  const attributesIsInRange = attributes.every((value) => (value >= 0 && value <= 90));
  const sumIsInRange = attributes.reduce((acc, currValue) => acc + currValue, 0) < maxSum;
  return attributesIsInRange && sumIsInRange;
};

const maxQuantity = async ({ deckId }) => {
  const [{ quantity }] = await sequelize.query(
    'SELECT COUNT(*) as quantity FROM cards WHERE deck_id = ?',
    { type: QueryTypes.SELECT, replacements: [deckId] },
  );
  const maxCardsQuantity = 32;
  return quantity === maxCardsQuantity;
};

const createCard = async (cardInfo) => {
  const {
    name, description, deckId,
    image, rarityId, isTrunfo,
    attributes: [one, two, three],
  } = cardInfo;
  const card = await Card.create({
    name,
    description,
    image,
    rarityId,
    isTrunfo,
    deckId,
    attributeOne: one,
    attributeTwo: two,
    attributeThree: three,
  });
  return card;
};

const hasDeckConflict = async (cardInfo) => {
  if ((await hasTrunfo(cardInfo))) {
    return { status: 409, data: { message: 'This deck already have a trunfo' } };
  }
  if (!attributesIsOk(cardInfo)) {
    return { status: 409, data: { message: 'Attributes rules inflicted' } };
  }
  return false;
};

const create = async (cardInfo) => {
  try {
    if (!(await deckExists(cardInfo.deckId))) {
      return { status: 404, data: { message: 'Deck not found' } };
    }
    if (await maxQuantity(cardInfo)) {
      return { status: 409, data: { message: 'Max cards quantity reached' } };
    }
    const hasConflict = await hasDeckConflict(cardInfo);
    if (hasConflict) return hasConflict; 
    const card = await createCard(cardInfo);
    return { status: 201, data: card };
  } catch (error) {
     return INTERNAL_ERROR;
  }
};

const makePartition = (quantity = 15, page = 1) => ({
  limit: parseInt(quantity, 10),
  offset: (parseInt(page, 10) - 1) * parseInt(quantity, 10),
  nextPage: parseInt(page, 10) + 1,
});

const makeFilters = (rarity, isTrunfo, q) => {
  const rare = rarity ? [rarity] : [1, 2, 3];
  const trunfo = isTrunfo !== 'true' && isTrunfo !== 'false'
    ? {} : { isTrunfo: { [Op.is]: isTrunfo === 'true' } };
  return { rarityId: { [Op.in]: rare }, name: { [Op.substring]: q }, ...trunfo };
};

const getAll = async (rarity, { quantity, page }, isTrunfo = '', q = '') => {
  try {
    const { limit, offset, nextPage } = makePartition(quantity, page);
    const { count, rows: cards } = await Card.findAndCountAll({ 
      where: makeFilters(rarity, isTrunfo, q),
      order: ['id'],
      limit,
      offset,
    });
    const hasLimit = quantity ? `&limit=${quantity}` : '';
    const next = (offset + limit) < count 
      ? `${URL_PROTOCOL}${URL_BASE}/cards?page=${nextPage}${hasLimit}` : null; 
    return { status: 200, data: { cards, next } };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const update = async (id, user, { name, description, image, rarityId, attributes, deckId }) => {
  try {
    const [attributeOne, attributeTwo, attributeThree] = attributes;
    const deck = await Deck.findByPk(deckId);
    if (!deck) return { status: 404, data: { message: 'Deck not found' } };
    if (deck.userId !== user.id) {
      return { status: 401, data: { message: 'This deck do not belong to this user' } };
    }
    const card = await Card.findByPk(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    await Card.update(
      { name, description, image, rarityId, attributeOne, attributeTwo, attributeThree },
      { where: { id } },
    );
    return { status: 200, data: { message: 'Card updated' } };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const getCard = async (id) => {
  const card = await Card.findByPk(
    id,
    { 
      include: [
        { 
          model: Deck, 
          as: 'deck',
          attributes: ['attributeOne', 'attributeTwo', 'attributeThree', 'name', 'userId'], 
        },
        {
          model: Rarity, as: 'rarity', attributes: ['name'],
        },
      ],
      attributes: { exclude: ['deckId', 'rarityId'] },
    },
  );
  return card;
};

const deleteCard = async (id, user) => {
  try {
    const card = await getCard(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    if (card.deck.userId !== user.id) {
      return { status: 401, data: { message: 'Unauthorized user' } };
    }
    console.log(card.deck.userId !== user.id);
    await Card.destroy({ where: { id } });
    return { status: 204 };
  } catch (error) {
    console.log(error);
    return INTERNAL_ERROR;
  }
};

const getById = async (id) => {
  try {
    const card = await getCard(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    return { status: 200, data: card };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { create, getById, getAll, deleteCard, update };
