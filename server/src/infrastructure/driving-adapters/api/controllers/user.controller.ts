import { Request, Response } from "express";
import {
  GetAllUsersUseCase,
  CreateUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { ForUserController } from "../../../ports/driving";
import { CreateUserDto } from "../../../../domain/dtos/user.dto";
import { handleHttp } from "../utils";

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
      const userData = req.body as CreateUserDto;
      const newUser = await this.createUserUseCase.run(userData);

      return res.status(201).json({ userCreated: newUser });
    } catch (error: any) {
      console.log(error.message);
      return handleHttp(500, "INTERNAL_SERVER_ERROR", res);
    }
  }
}
