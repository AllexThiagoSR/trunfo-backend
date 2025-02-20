import { Router } from "express";
import DeckController from "../controllers/DeckController";
import adapter from "../utils/adapter";

const deckRouter = Router();
const controller = new DeckController()

deckRouter.get('/', adapter((req, res) => controller.getAll(req, res)));

export default deckRouter;