import { Router } from "express";
import UserController from "../controllers/UserController";
import adapter from "../utils/adapter";
import CreateUserMiddleware from "../middlewares/CreateUserMiddleware";

const userRouter = Router();
const controller = new UserController();

userRouter.post('/', CreateUserMiddleware.validate, adapter((req, res) => controller.create(req, res)));
userRouter.post('/login', adapter((req, res) => controller.userLogin(req, res)));

export default userRouter;