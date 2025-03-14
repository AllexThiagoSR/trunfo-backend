import ServiceResponse from "../utils/ServiceRespose";
import DeckRepository from "../repositories/DeckRepository";
import IDeckRepository from "../types/IDeckRepository";
import Deck from "../database/models/Deck.model";
import APIError from "../utils/ApiError";
import { DeckCreation } from "../types/DeckCreation";
import DeckWithAssociations from "../types/DeckWithAssociations";
import { DeckUpdation } from "../types/DeckUpdation";

export default class DeckService {
  private repository: IDeckRepository;

  constructor(repo: IDeckRepository = new DeckRepository()) { this.repository = repo; }

  public async getAll(): Promise<ServiceResponse<Deck[]>> {
    const decks = await this.repository.getAll();
    return new ServiceResponse(200, decks);
  }

  public async getById(id: string): Promise<ServiceResponse<DeckWithAssociations>> {
    const deck = await this.repository.getById(id);
    if (!deck) throw new APIError('Deck not found', 404);
    return new ServiceResponse(200, deck);
  }

  public async create(data: DeckCreation): Promise<ServiceResponse<Deck>> {
    const deck = await this.repository.create(data.name, data.attributeOne, data.attributeTwo, data.attributeThree, data.userId);
    return new ServiceResponse(201, deck);
  }

  private static validateUpdationData(data: DeckUpdation, deck: DeckWithAssociations) {
    if (data.name && data.name === deck.name)
      throw new APIError('This is already the name of the deck', 409);
    if (data.attributeOne && data.attributeOne === deck.attributeOne)
      throw new APIError('This is already the name of the attributeOne of the deck', 409);
    if (data.attributeTwo && data.attributeTwo === deck.attributeTwo)
      throw new APIError('This is already the name of the attributeTwo of the deck', 409);
    if (data.attributeThree && data.attributeThree === deck.attributeThree)
      throw new APIError('This is already the name of the attributeThree of the deck', 409);
  }

  public async update(id: string, data: DeckUpdation, userId: string): Promise<ServiceResponse<DeckWithAssociations>> {
    const deck = await this.repository.getById(id);
    if (!deck)
      throw new APIError('Deck not found', 404);
    if (deck.user?.id !== userId)
      throw new APIError('This user can\'t update this card.', 403);
    DeckService.validateUpdationData(data, deck);
    (deck.dataValues as DeckWithAssociations).name = data.name || deck.name;
    (deck.dataValues as DeckWithAssociations).attributeOne = data.attributeOne || deck.attributeOne;
    (deck.dataValues as DeckWithAssociations).attributeTwo = data.attributeTwo || deck.attributeTwo;
    (deck.dataValues as DeckWithAssociations).attributeThree = data.attributeThree || deck.attributeThree;
    await this.repository.update(id, data);
    return new ServiceResponse(200, deck);
  }
}