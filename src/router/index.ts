import { Router } from "express";
import userRouter from "./user.routes";
import deckRouter from "./deck.routes";
import ValidateLoginTokenMiddleware from "../middlewares/ValidateLoginTokenMiddleware";

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('/decks', ValidateLoginTokenMiddleware.validate, deckRouter);

export default indexRouter;