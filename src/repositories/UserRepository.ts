import IUserRepository from "../types/IUserRepository";
import User from "../database/models/User.model";
import Deck from "../database/models/Deck.model";

export default class UserRepository implements IUserRepository {
  model = User;

  public async getAll(): Promise<User[]> {
    const users = await this.model.findAll({ attributes: { exclude: ['password', 'role'] } });
    return users
  }

  public async getById(id: string, includeDecks?: boolean): Promise<User | null> {
    const user = await this.model.findByPk(
      id,
      {
        attributes: { exclude: ['password'] },
        include: includeDecks ? { model: Deck, as: 'decks' } : undefined,
      }
    );
    return user
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  public async create(email: string, password: string, username: string, image: string | null): Promise<User> {
    const user = await this.model.create({ email, password, username, image });
    return user;
  }

  public async updateUser(id: string, username?: string, image?: string): Promise<[affectedCount: number]> {
    const row = await this.model.update({ username, image }, { where: { id } });
    return row;
  }
}
