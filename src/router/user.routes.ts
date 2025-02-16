import { Router } from "express";
import UserController from "../controllers/UserController";
import adapter from "../utils/adapter";

const userRouter = Router();
const controller = new UserController();

userRouter.post('/login', adapter((req, res) => controller.userLogin(req, res)))

export default userRouter;