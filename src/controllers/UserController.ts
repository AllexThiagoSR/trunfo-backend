import { Request, Response } from "express";
import UserService from "../services/UserService";
import User from "../database/models/User.model";

export default class UserController {
  private service: UserService;
  
  constructor(service: UserService = new UserService()) { this.service = service }

  public async userLogin(req: Request, res: Response) {
    const {email, password} = req.body;
    const response = await this.service.login(email, password);
    res.status(response.statusCode).json(response.body);
    return;
  }

  public async create(req: Request, res: Response) {
    const response = await this.service.create(req.body);
    res.status(response.statusCode).json(response.body);
    return;
  }

  public async update(req: Request, res: Response) {
    const response = await this.service.update(res.locals.user.id, req.body.username, req.body.image);
    res.status(response.statusCode).json(response.body);
    return;
  }

  public async getLoggedUser(req: Request, res: Response) {
    const response = await this.service.getById(res.locals.user.id);
    res.status(response.statusCode).json({ ...(response.body as User).dataValues , canEdit: true });
    return;
  }
}