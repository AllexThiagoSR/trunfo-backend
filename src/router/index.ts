import { Router } from "express";
import userRouter from "./user.routes";

const indexRouter = Router()

indexRouter.use('/user', userRouter);

export default indexRouter;