import ICardRepository from "../types/ICardRepository";
import CardRepository from "../repositories/CardRepository";
import ServiceResponse from "../utils/ServiceRespose";
import Card from "../database/models/Card.model";
import { CardCreation } from "../types/CardCreation";
import APIError from "../utils/ApiError";
import IDeckRepository from "../types/IDeckRepository";
import DeckRepository from "../repositories/DeckRepository";
import CardWithAssociations from "../types/CardWithAssociations";
import { CardUpdation } from "../types/CardUpdation";

export default class CardService {
  private repository: ICardRepository;
  private deckRepository: IDeckRepository;

  constructor(repo = new CardRepository(), deckRepo = new DeckRepository()) {
    this.repository = repo;
    this.deckRepository = deckRepo;
  }

  async getAll(): Promise<ServiceResponse<Card[]>> {
    const cards = await this.repository.getAll();
    return new ServiceResponse(200, cards);
  }

  async create(data: CardCreation, userId: string): Promise<ServiceResponse<Card>> {
    const { attributes: [attr1, attr2, attr3] } = data;
    if (attr1 + attr2 + attr3 > 210) throw new APIError('The total value of the sum of the 3 attributes must be less than or equal to 210', 400);

    const deck = await this.deckRepository.getById(data.deckId);
    if (!deck)
      throw new APIError('Deck not exists', 404);
    if(deck.user!.id !== userId)
      throw new APIError('This user can\'t create a card in this deck', 403);
    if (deck.cards!.length === 32)
      throw new APIError('Limit of card per deck reached', 409);
    if (deck.cards!.some((card) => card.dataValues.name.toLowerCase() === data.name.toLowerCase()))
      throw new APIError('There is already a card with that name in this deck', 409)
    if (deck.cards!.some((card) => card.dataValues.isTrunfo) && data.isTrunfo)
      throw new APIError('Deck already has a Super Trump', 409);

    const card = await this.repository.create(data);

    return new ServiceResponse(201, card);
  }

  async delete(id: string): Promise<ServiceResponse<null>> {
    const card = await this.repository.getById(id);
    if (!card) throw new APIError('Card not found', 404);
    const deletedRowQuantity = await this.repository.deleteById(id);
    if (!deletedRowQuantity) throw new APIError('Internal server error', 500);
    return new ServiceResponse(204, null);
  }

  async update(id: string, data: CardUpdation, userId: string): Promise<ServiceResponse<CardWithAssociations>> {
    const cardToUpdate = await this.repository.getById(id);
    if (!cardToUpdate) throw new APIError('Card not found', 404);
    if (cardToUpdate.deck?.userId !== userId) throw new APIError('This user can\'t update this card.', 403);

    cardToUpdate.name = data.name || cardToUpdate.name;
    cardToUpdate.isTrunfo = data.isTrunfo !== undefined ? data.isTrunfo : cardToUpdate.isTrunfo;
    cardToUpdate.description = data.description || cardToUpdate.description;
    cardToUpdate.image = data.image || cardToUpdate.image;
    cardToUpdate.rarityId = data.rarityId || cardToUpdate.rarityId;
    cardToUpdate.attributeOne = data.attributes?.attributeOne || cardToUpdate.attributeOne;
    cardToUpdate.attributeTwo = data.attributes?.attributeTwo || cardToUpdate.attributeTwo;
    cardToUpdate.attributeThree = data.attributes?.attributeThree || cardToUpdate.attributeThree;
    if (cardToUpdate.attributeOne + cardToUpdate.attributeTwo + cardToUpdate.attributeThree > 210)
      throw new APIError('The total value of the sum of the 3 attributes must be less than or equal to 210', 400);

    const deck = await this.deckRepository.getById(cardToUpdate.deckId);
    if (deck!.cards!.some((card) => card.dataValues.name.toLowerCase() === cardToUpdate.name.toLowerCase() && cardToUpdate.id !== card.dataValues.id))
      throw new APIError('There is already a card with that name in this deck', 409)
    if (cardToUpdate.isTrunfo && deck!.cards!.some((card) => card.dataValues.isTrunfo && cardToUpdate.id !== card.dataValues.id))
      throw new APIError('Deck already has a Super Trump', 409);

    await this.repository.update(id, {
      ...data,
      attributeOne: data.attributes?.attributeOne,
      attributeTwo: data.attributes?.attributeTwo,
      attributeThree: data.attributes?.attributeThree
    });

    (cardToUpdate.dataValues as CardWithAssociations).deck = undefined;

    return new ServiceResponse(200, cardToUpdate);
  }
}