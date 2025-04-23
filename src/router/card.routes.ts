import { Router } from "express";
import CardController from "../controllers/CardControlller";
import adapter from "../utils/adapter";
import CreateCardMiddleware from "../middlewares/CreateCardMiddleware";
import UpdateCardMiddleware from "../middlewares/UpdateCardMiddleware";

const cardRouter = Router();
const controller = new CardController();

cardRouter.get('/', adapter((req, res) => controller.getAll(req, res)));
cardRouter.post('/', CreateCardMiddleware.validate, adapter((req, res) => controller.create(req, res)));
cardRouter.delete('/:id', adapter((req, res) => controller.delete(req, res)));
cardRouter.patch('/:id', UpdateCardMiddleware.validate, adapter((req, res) => controller.update(req, res)));

export default cardRouter;