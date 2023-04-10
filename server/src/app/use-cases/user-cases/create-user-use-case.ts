import { UserRepository } from "../../../domain/repositories/user-repository";
import { CreateUserDto } from "../../../domain/dtos/user.dto";

export class CreateUserUseCase {
  private readonly _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async run(user: CreateUserDto) {
    const newUser = await this._userRepository.createUser(user);

    return newUser;
  }
}
