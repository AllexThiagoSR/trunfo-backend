import { Request, Response } from "express";
import UserService from "../services/UserService";

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
}