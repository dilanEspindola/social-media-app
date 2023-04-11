import { Repository } from "typeorm";
import { CreateUserDto } from "../../../../domain/dtos/user.dto";
import { UserRepository } from "../../../../domain/repositories/user-repository";
import { MysqlConnection } from "../dbConnection";
import { User } from "../models";

export class TypeOrmUserRepository implements UserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = MysqlConnection.getDatabaseInstance()
      .appDataSource()
      .getRepository<User>(User);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: {
        email: true,
        fullname: true,
        id: true,
        username: true,
        photo: true,
      },
    });

    return users;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  deleteUserById(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
