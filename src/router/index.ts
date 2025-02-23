import { Router } from "express";
import userRouter from "./user.routes";
import deckRouter from "./deck.routes";
import ValidateLoginTokenMiddleware from "../middlewares/ValidateLoginTokenMiddleware";
import cardRouter from "./card.routes";

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('/decks', ValidateLoginTokenMiddleware.validate, deckRouter);
indexRouter.use('/cards', ValidateLoginTokenMiddleware.validate, cardRouter);

export default indexRouter;