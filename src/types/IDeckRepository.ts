import Deck from '../database/models/Deck.model';

export default interface IDeckRepository {
  getAll(): Promise<Deck[]>;
  getById(id: string): Promise<Deck | null>;
  create(
    name: string,
    attributeOne: string,
    attributeTwo: string,
    attributeThree: string,
    userId: string,
  ): Promise<Deck>;
}
