import Card from "../database/models/Card.model";
import ICardRepository from "../types/ICardRepository";
import { CardCreation } from "../types/CardCreation";
import Deck from "../database/models/Deck.model";
import User from "../database/models/User.model";
import Rarity from "../database/models/Rarity.model";
import CardWithAssociations from "../types/CardWithAssociations";
import { CardUpdation } from "../types/CardUpdation";

export default class CardRepository implements ICardRepository {
  private model = Card;

  async getAll(): Promise<Card[]> {
    const cards = await this.model.findAll({
      include: [
        {
          model: Deck,
          as: 'deck',
          attributes: ['id', 'name', 'created'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password', 'email', 'role'] }
            }
          ]
        },
        { model: Rarity, as: 'rarity' }
      ],
    });
    return cards;
  }

  async getById(id: string): Promise<CardWithAssociations | null> {
    const card = await this.model.findByPk(
      id,
      {
        include: {
          model: Deck,
          as: 'deck',
          include: [
            {
              model: User,
              as: 'user',
            }
          ]
        }
      }
    );
    return card;
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

  async deleteById(id: string): Promise<number> {
    const deletedRowQuantity = await this.model.destroy({ where: { id } });
    return deletedRowQuantity;
  }

  async update(id: string, data: Partial<Card>): Promise<[affectedCount: number]> {
    const updatedCard = await this.model.update(data, { where: { id } });
    return updatedCard;
  }
}