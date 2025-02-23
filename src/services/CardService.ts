import ICardRepository from "../types/ICardRepository";
import CardRepository from "../repositories/CardRepository";
import ServiceResponse from "../utils/ServiceRespose";
import Card from "../database/models/Card.model";
import { CardCreation } from "../types/CardCreation";
import APIError from "../utils/ApiError";
import IDeckRepository from "../types/IDeckRepository";
import DeckRepository from "../repositories/DeckRepository";
import User from "../database/models/User.model";

export default class CardService {
  private repository: ICardRepository;
  private deckRepository: IDeckRepository;

  constructor(repo = new CardRepository(), deckRepo = new DeckRepository()) {
    this.repository = repo;
    this.deckRepository = deckRepo;
  }

  async create(data: CardCreation, userId: string): Promise<ServiceResponse<Card>> {
    const { attributes: [attr1, attr2, attr3] } = data;
    if (attr1 + attr2 + attr3 > 210) throw new APIError('The total value of the sum of the 3 attributes must be less than or equal to 210', 400);

    const deck = await this.deckRepository.getById(data.deckId);
    if (!deck)
      throw new APIError('Deck not exists', 404)
    console.log(deck.dataValues.userId, userId);
    
    if(deck.dataValues.userId !== userId)
      throw new APIError('This user can\'t create a card in this deck', 403);
    
    const deckCards = await this.repository.getCardsByDeckId(data.deckId);
    if (deckCards.length === 32)
      throw new APIError('Limit of card per deck reached', 409);
    if (deckCards.some((card) => card.dataValues.name.toLowerCase() === data.name.toLowerCase()))
      throw new APIError('There is already a card with that name in this deck', 409)
    if (deckCards.some((card) => card.dataValues.isTrunfo))
      throw new APIError('Deck already has a Super Trump', 409);

    const card = await this.repository.create(data);

    return new ServiceResponse(201, card);
  }
 }