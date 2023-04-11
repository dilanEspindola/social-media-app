import { Request, Response } from "express";
import {
  GetAllUsersUseCase,
  GetUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { ForUserController } from "../../../ports/driving";
import { handleHttp, validationError } from "../utils";
import { logger } from "../../logger";

export class UserCotroller implements ForUserController {
  constructor(
    private readonly getAllUserUseCase: GetAllUsersUseCase,
    private readonly getUserUsecase: GetUserUseCase
  ) {}

  async getAllUsers(_req: Request, res: Response): Promise<any> {
    try {
      const users = await this.getAllUserUseCase.run();

      return res.status(200).json(users);
    } catch (error: any) {
      logger.error(error.message);
      return handleHttp(500, "INTERNAL_SERVER_ERROR", res);
    }
  }

  async getUserByUsername(req: Request, res: Response): Promise<any> {
    try {
      const user = await this.getUserUsecase.getUserByUsername(
        req.query.username as string
      );

      return res.status(200).json(user);
    } catch (error: any) {
      logger.error(error.message);
      const errorMessage = validationError(error.message);

      return handleHttp(errorMessage.statusCode, errorMessage.message, res);
    }
  }

  async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const user = await this.getUserUsecase.getUserById(req.params.id);

      return res.status(200).json(user);
    } catch (error: any) {
      logger.error(error.message);
      const errorMessage = validationError(error.message);

      return handleHttp(errorMessage.statusCode, errorMessage.message, res);
    }
  }
}
