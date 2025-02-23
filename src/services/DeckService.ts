import ServiceResponse from "../utils/ServiceRespose";
import DeckRepository from "../repositories/DeckRepository";
import IDeckRepository from "../types/IDeckRepository";
import Deck from "../database/models/Deck.model";
import APIError from "../utils/ApiError";
import { DeckCreation } from "../types/DeckCreation";
import DeckWithAssociations from "../types/DeckWithAssociations";

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
}