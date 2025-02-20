import APIError from "../utils/ApiError";
import Deck from "../database/models/Deck.model";
import IDeckRepository from "../types/IDeckRepository";
import User from "../database/models/User.model";

export default class DeckRepository implements IDeckRepository {
  private model = Deck;

  public async getAll(): Promise<Deck[]> {
    const decks = await this.model.findAll({
      attributes: { exclude: ['attributeOne', 'attributeTwo', 'attributeThree', 'userId'] },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['email', 'password', 'role'] }
      }
    });
    return decks;
  }

  public async getById(id: string): Promise<Deck | null> {
    const deck = await this.model.findByPk(id);
    return deck;
  }

  public async create(name: string, attributeOne: string, attributeTwo: string, attributeThree: string, userId: string): Promise<Deck> {
    throw new APIError('Not implemented.', 500);
  }
}