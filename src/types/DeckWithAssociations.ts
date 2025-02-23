import User from "../database/models/User.model";
import Card from "../database/models/Card.model";
import Deck from "../database/models/Deck.model";

export default interface DeckWithAssociations extends Deck {
  cards?: Card[];
  user?: User;
}