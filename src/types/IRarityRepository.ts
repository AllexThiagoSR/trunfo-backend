import Rarity from "../database/models/Rarity.model";

export default interface IRarityRepository {
  getAll(): Promise<Rarity[]>;
}