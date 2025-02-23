import { Router } from "express";
import CardController from "../controllers/CardControlller";
import adapter from "../utils/adapter";
import CreateCardMiddleware from "../middlewares/CreateCardMiddleware";

const cardRouter = Router();
const controller = new CardController();

cardRouter.post('/', CreateCardMiddleware.validate, adapter((req, res) => controller.create(req, res)));
cardRouter.get('/', adapter((req, res) => controller.getAll(req, res)))

export default cardRouter;