import { UserRepository } from "../../../domain/repositories/user-repository";
import {
  CreateUserDto,
  CreateUserEmailDto,
} from "../../../domain/dtos/user.dto";
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

  async signinEmail(user: CreateUserEmailDto) {
    const userExist = await this._userRepository.getUserByEmail(user.email);

    if (userExist) {
      return userExist;
    }

    const newUser = await this._userRepository.createUser(user);

    return newUser;
  }
}
