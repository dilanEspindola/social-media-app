import { User } from "../../../domain/entities/user";
import { UserNotFoundException } from "../../../domain/exceptions";
import { UserRepository } from "../../../domain/repositories/user-repository";

export class GetUserUseCase {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this._userRepository.getUserByUsername(username);

    if (!user) throw new UserNotFoundException();

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this._userRepository.getUserById(id);

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
