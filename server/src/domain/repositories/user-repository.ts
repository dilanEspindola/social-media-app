import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user";

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(user: CreateUserDto): Promise<User>;
  deleteUserById(id: string): Promise<void>;
}
