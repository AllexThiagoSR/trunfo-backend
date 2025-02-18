import User from "../database/models/User.model";

export default interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string, includeDecks?: boolean): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>
  create(email: string, password: string, username: string, image: string | null): Promise<User>;
  updateUser(id: string, username?: string, image?:string): Promise<[affectedCount: number]>
}