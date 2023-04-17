import { Request, Response } from "express";
import { ForAuthenticateController } from "../../../ports/driving";
import {
  EncryptAndValidatePassword,
  generateToken,
  handleHttp,
  trimData,
  validationError,
} from "../utils";
import {
  CreateUserUseCase,
  GetUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { logger } from "../../logger";
import {
  LoginUserValidationTyoe,
  RegisterUserValidationType,
} from "../utils/validations";
import { UserNotFoundException } from "../../../../domain/exceptions";
import { User } from "../../../../domain/entities/user";

export class AuthController implements ForAuthenticateController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  async register(
    req: Request<unknown, unknown, RegisterUserValidationType>,
    res: Response
  ) {
    const userData = trimData<RegisterUserValidationType>(req.body);
    try {
      const hashPassword = new EncryptAndValidatePassword();

      const passwordHashed = await hashPassword.hashPassword(userData.password);

      const userCreated = await this.createUserUseCase.run({
        ...userData,
        password: passwordHashed,
      });

      const { token } = generateToken({
        id: userCreated.id,
        email: userCreated.email,
      });

      return res
        .status(201)
        .json({ user: { ...userCreated, password: "" }, token });
    } catch (error: any) {
      logger.error(error.message);
      const { message, statusCode } = validationError(error.message);
      return handleHttp(statusCode, message, res);
    }
  }

  async login(
    req: Request<unknown, unknown, LoginUserValidationTyoe>,
    res: Response
  ) {
    try {
      const hashPassword = new EncryptAndValidatePassword();
      const user = await this.getUserUseCase.getUserByEmail(req.body.email);

      const isValidatePassword = await hashPassword.validatePassword(
        req.body.password,
        user.password
      );

      if (!isValidatePassword) throw new UserNotFoundException();

      const { token } = generateToken({ id: user.id, email: user.email });

      return res.status(200).json({ user: { ...user, password: "" }, token });
    } catch (error: any) {
      logger.error(error.message);
      const { message, statusCode } = validationError(error.message);
      return handleHttp(statusCode, message, res);
    }
  }

  async loginGoogle(_req: Request, res: Response): Promise<any> {
    return res.json({ msg: "ok" });
  }

  async loginGoogleCallback(req: Request, res: Response): Promise<any> {
    try {
      const user = req.user as User;
      const { token } = generateToken({ id: user.id, email: user.email });
      return res.json({ user, token });
    } catch (error: any) {
      logger.error(error.message);
      const { message, statusCode } = validationError(error.message);
      return handleHttp(statusCode, message, res);
    }
  }
}
