import { Router } from "express";
import UserController from "../controllers/UserController";
import adapter from "../utils/adapter";
import CreateUserMiddleware from "../middlewares/CreateUserMiddleware";
import ValidateLoginTokenMiddleware from "../middlewares/ValidateLoginTokenMiddleware";

const userRouter = Router();
const controller = new UserController();

userRouter.post('/', CreateUserMiddleware.validate, adapter((req, res) => controller.create(req, res)));
userRouter.patch('/', ValidateLoginTokenMiddleware.validate, adapter((req, res) => controller.update(req, res)));
userRouter.post('/login', adapter((req, res) => controller.userLogin(req, res)));
userRouter.get('/logged', ValidateLoginTokenMiddleware.validate, adapter((req, res) => controller.getLoggedUser(req, res)));

export default userRouter;