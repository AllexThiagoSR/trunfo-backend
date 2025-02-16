import User from "../database/models/User.model";

export default interface IUserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>
}