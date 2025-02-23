import Deck from "../database/models/Deck.model";
import IDeckRepository from "../types/IDeckRepository";
import User from "../database/models/User.model";
import Card from "../database/models/Card.model";
import DeckWithAssociations from "../types/DeckWithAssociations";

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

  public async getById(id: string): Promise<DeckWithAssociations | null> {
    const deck = await this.model.findByPk(
      id,
      {
        attributes: { exclude: ['userId'] },
        include: [
          {
            model: User,
            as: 'user',
            attributes: { exclude: ['email', 'password', 'role'] },
          },
          {
            model: Card,
            as: 'cards',
          }
        ]
      }
    );
    return deck;
  }

  public async create(name: string, attributeOne: string, attributeTwo: string, attributeThree: string, userId: string): Promise<Deck> {
    const deck = await this.model.create({ name, attributeOne, attributeThree, attributeTwo, userId });
    return deck;
  }
}