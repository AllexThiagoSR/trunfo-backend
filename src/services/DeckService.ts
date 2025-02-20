import ServiceResponse from "../utils/ServiceRespose";
import DeckRepository from "../repositories/DeckRepository";
import IDeckRepository from "../types/IDeckRepository";
import Deck from "../database/models/Deck.model";

export default class DeckService {
  private repository: IDeckRepository;

  constructor(repo: IDeckRepository = new DeckRepository()) { this.repository = repo; }

  public async getAll(): Promise<ServiceResponse<Deck[]>> {
    const decks = await this.repository.getAll();
    return new ServiceResponse(200, decks);
  }
}