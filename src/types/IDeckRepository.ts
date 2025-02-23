import Deck from '../database/models/Deck.model';
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
}
