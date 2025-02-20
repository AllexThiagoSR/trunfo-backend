import { Router } from "express";
import userRouter from "./user.routes";
import deckRouter from "./deck.routes";

const indexRouter = Router()

indexRouter.use('/users', userRouter);
indexRouter.use('/decks', deckRouter);

export default indexRouter;