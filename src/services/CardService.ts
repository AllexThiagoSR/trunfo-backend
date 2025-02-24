import ICardRepository from "../types/ICardRepository";
import CardRepository from "../repositories/CardRepository";
import ServiceResponse from "../utils/ServiceRespose";
import Card from "../database/models/Card.model";
import { CardCreation } from "../types/CardCreation";
import APIError from "../utils/ApiError";
import IDeckRepository from "../types/IDeckRepository";
import DeckRepository from "../repositories/DeckRepository";

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
}