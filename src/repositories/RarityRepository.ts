import Rarity from "../database/models/Rarity.model";
import IRarityRepository from "../types/IRarityRepository";

export default class RarityRepository implements IRarityRepository {
  private model = Rarity;

  public async getAll(): Promise<Rarity[]> {
    const rarities = await this.model.findAll();
    return rarities;
  }
}