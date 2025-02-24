import { Router } from "express";
import ValidateLoginTokenMiddleware from "../middlewares/ValidateLoginTokenMiddleware";
import userRouter from "./user.routes";
import deckRouter from "./deck.routes";
import cardRouter from "./card.routes";
import rarityRouter from "./rarity.routes";

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use(ValidateLoginTokenMiddleware.validate);
indexRouter.use('/decks', deckRouter);
indexRouter.use('/cards', cardRouter);
indexRouter.use('/rarities', rarityRouter);

export default indexRouter;