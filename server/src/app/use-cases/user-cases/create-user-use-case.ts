import { UserRepository } from "../../../domain/repositories/user-repository";
import { CreateUserDto } from "../../../domain/dtos/user.dto";
import { UserExistException } from "../../../domain/exceptions";

export class CreateUserUseCase {
  private readonly _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async run(user: CreateUserDto) {
    const userExist = await this._userRepository.getUserByUsername(
      user.username
    );

    if (userExist) throw new UserExistException();

    const newUser = await this._userRepository.createUser(user);

    return newUser;
  }
}
