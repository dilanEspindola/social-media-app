import { CreateUserDto, CreateUserEmailDto } from "../dtos/user.dto";
import { User } from "../entities/user";

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(user: CreateUserDto | CreateUserEmailDto): Promise<User>;
  deleteUserById(id: string): Promise<void>;
}
