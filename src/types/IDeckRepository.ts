import Deck from '../database/models/Deck.model';
import { DeckUpdation } from './DeckUpdation';
import DeckWithAssociations from './DeckWithAssociations';

export default interface IDeckRepository {
  getAll(): Promise<Deck[]>;
  getById(id: string): Promise<DeckWithAssociations | null>;
  create(
    name: string,
    attributeOne: string,
    attributeTwo: string,
    attributeThree: string,
    userId: string,
  ): Promise<Deck>;
  update(id: string, data: DeckUpdation): Promise<[affectedCount: number]>;
}
