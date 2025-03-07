import Card from "../database/models/Card.model";
import { CardCreation } from "./CardCreation";
import { CardUpdation } from "./CardUpdation";
import CardWithAssociations from "./CardWithAssociations";

export default interface ICardRepository {
  getAll(): Promise<Card[]>;
  getById(id: string): Promise<CardWithAssociations | null>;
  create(data: CardCreation): Promise<Card>;
  deleteById(id: string): Promise<number>;
  update(id: string, data: Partial<Card>): Promise<[affectedCount: number]>;
}