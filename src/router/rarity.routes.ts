import { Router } from "express";
import RarityController from "../controllers/RarityController";
import adapter from "../utils/adapter";

const rarityRouter = Router();
const controller = new RarityController();

rarityRouter.get('/', adapter((req, res) => controller.getAll(req, res)));

export default rarityRouter;
