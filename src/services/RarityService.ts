import ServiceResponse from "../utils/ServiceRespose";
import IRarityRepository from "../types/IRarityRepository";
import RarityRepository from "../repositories/RarityRepository";
import Rarity from "../database/models/Rarity.model";

export default class RarityService {
  private repository: IRarityRepository;

  constructor(repo: IRarityRepository = new RarityRepository()) { this.repository = repo }

  async getAll(): Promise<ServiceResponse<Rarity[]>> {
    const rarities = await this.repository.getAll();
    return new ServiceResponse(200, rarities);
  }
}