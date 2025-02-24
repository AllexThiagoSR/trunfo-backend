import { Request, Response } from "express";
import RarityService from "../services/RarityService";

export default class RarityController {
  private service: RarityService;

  constructor(serivce: RarityService = new RarityService()) { this.service = serivce; }

  async getAll(_req: Request, res: Response) {
    const response = await this.service.getAll();
    res.status(response.statusCode).json(response.body);
    return;
  }
}