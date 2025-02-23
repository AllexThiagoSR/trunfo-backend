import APIError from "../utils/ApiError";
import Card from "../database/models/Card.model";
import ICardRepository from "../types/ICardRepository";
import { CardCreation } from "../types/CardCreation";

export default class CardRepository implements ICardRepository {
  private model = Card;

  async getAll(): Promise<Card[]> {
    throw new APIError('Not implemented', 500);
  }

  async getById(id: string): Promise<Card | null> {
    throw new APIError('Not implemented', 500);
  }

  async create(data: CardCreation): Promise<Card> {
    const {
      name,
      attributes: [attributeOne, attributeTwo, attributeThree],
      deckId,
      description,
      image,
      isTrunfo,
      rarityId
    } = data;
    const card = await this.model.create({ name, attributeOne, attributeThree, attributeTwo, deckId, description, image, isTrunfo, rarityId });
    return card
  }

  async deleteById(id: string): Promise<any> {
    throw new APIError('Not implemented', 500);
  }

  async getCardsByDeckId(deckId: string): Promise<Card[]> {
    const cards = await this.model.findAll({ where: { deckId }});
    return cards
  }
}