import ServiceResponse from "../utils/ServiceRespose";
import UserRepository from "../repositories/UserRepository";
import IUserRepository from "../types/IUserRepository";
import JWTUtils from "../utils/JWTUtils";
import APIError from "../utils/ApiError";
import BcryptUtils from "../utils/Bcrypt";

export default class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository = new UserRepository()) { this.repository = repository; }

  public async login(email?: string | null, password?: string | null): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) throw new APIError('You need to inform an email and a password', 400);
    const user = await this.repository.getByEmail(email);
    if (user === null) throw new APIError('Incorrect email or password', 400);
    if (!BcryptUtils.compare(password, user.password)) throw new APIError('Incorrect email or password', 400);

    const jwtCreator = new JWTUtils();
    const token = jwtCreator.generateToken({ id: user.id, email: user.email, username: user.username });
    return new ServiceResponse(200, { token });
  }
}