import ServiceResponse from "../utils/ServiceRespose";
import UserRepository from "../repositories/UserRepository";
import IUserRepository from "../types/IUserRepository";
import JWTUtils from "../utils/JWTUtils";
import APIError from "../utils/ApiError";
import BcryptUtils from "../utils/Bcrypt";
import { SequelizeScopeError } from "sequelize/types";

export default class UserService {
  private repository: IUserRepository;
  private jwtCreator = new JWTUtils()

  constructor(repository: IUserRepository = new UserRepository()) { this.repository = repository; }

  public async login(email?: string | null, password?: string | null): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) throw new APIError('You need to inform an email and a password', 400);
    const user = await this.repository.getByEmail(email);
    if (user === null) throw new APIError('Incorrect email or password', 400);
    if (!BcryptUtils.compare(password, user.password)) throw new APIError('Incorrect email or password', 400);

    const token = this.jwtCreator.generateToken({ id: user.id, email: user.email, username: user.username });
    return new ServiceResponse(200, { token });
  }

  public async create({ email, password, username, image }: { email: string, password: string, username: string, image: string | null }): Promise<ServiceResponse<{ token: string }>> {
    try {
      const hashedPassword = BcryptUtils.hash(password);
      const user = await this.repository.create(email, hashedPassword, username, image);
      const token = this.jwtCreator.generateToken({ email, username, id: user.id });
      
      return new ServiceResponse(201, { token });
    } catch (error) {
      if ((error as SequelizeScopeError).name === 'SequelizeUniqueConstraintError') throw new APIError('Email already exists, try to log in', 409);
      throw new APIError('Internal server error', 500)
    }
  }
}