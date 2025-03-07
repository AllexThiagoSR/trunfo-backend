import Card from "../database/models/Card.model";
import DeckWithAssociations from "./DeckWithAssociations";

export default interface CardWithAssociations extends Card {
  deck?: DeckWithAssociations;
}