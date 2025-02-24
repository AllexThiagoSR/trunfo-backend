import Card from "../database/models/Card.model";
import { CardCreation } from "./CardCreation";

export default interface ICardRepository {
  getAll(): Promise<Card[]>;
  getById(id: string): Promise<Card | null>;
  create(data: CardCreation): Promise<Card>;
  deleteById(id: string): Promise<number>;
  update(id: string, data: Partial<CardCreation>): Promise<Card>;
}