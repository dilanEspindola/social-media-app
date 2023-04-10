import { UserRepository } from "../../../domain/repositories/user-repository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run() {
    const users = await this.userRepository.getAllUsers();

    return users;
  }
}
