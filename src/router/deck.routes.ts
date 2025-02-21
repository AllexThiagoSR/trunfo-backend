import { Router } from "express";
import DeckController from "../controllers/DeckController";
import adapter from "../utils/adapter";
import CreateDeckMiddleware from "../middlewares/CreateDeckMiddleware";

const deckRouter = Router();
const controller = new DeckController()

deckRouter.get('/', adapter((req, res) => controller.getAll(req, res)));
deckRouter.get('/:id', adapter((req, res) => controller.getById(req, res)));
deckRouter.post('/', CreateDeckMiddleware.validate, adapter((req, res) => controller.create(req, res)));

export default deckRouter;