import { Request, Response } from "express";
import { CreateUserDto } from "../../../../domain/dtos/user.dto";
import {
  GetAllUsersUseCase,
  CreateUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { ForUserController } from "../../../ports/driving";
import { EncryptAndValidatePassword, handleHttp } from "../utils";
import { logger } from "../../logger";

export class UserCotroller implements ForUserController {
  constructor(
    private readonly getAllUserUseCase: GetAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async getAllUsers(_req: Request, res: Response): Promise<any> {
    try {
      const users = await this.getAllUserUseCase.run();

      return res.status(200).json(users);
    } catch (error: any) {
      console.log(error.message);
      return handleHttp(500, "INTERNAL_SERVER_ERROR", res);
    }
  }

  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const hashPassword = new EncryptAndValidatePassword();
      const userData = req.body as CreateUserDto;

      const passwordHashed = await hashPassword.hashPassword(userData.password);

      const { password, ...rest } = await this.createUserUseCase.run({
        ...userData,
        password: passwordHashed,
      });

      return res.status(201).json({ user: rest });
    } catch (error: any) {
      logger.error(error.message);
      return handleHttp(500, "INTERNAL_SERVER_ERROR", res);
    }
  }
}
