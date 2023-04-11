import { Request, Response } from "express";
import { ForAuthenticateController } from "../../../ports/driving";
import {
  EncryptAndValidatePassword,
  generateToken,
  handleHttp,
  trimData,
} from "../utils";
import { CreateUserUseCase } from "../../../../app/use-cases/user-cases";
import { logger } from "../../logger";
import { RegisterUserValidationType } from "../utils/validations";

export class AuthController implements ForAuthenticateController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async register(
    req: Request<unknown, unknown, RegisterUserValidationType>,
    res: Response
  ) {
    const userData = trimData(req.body) as RegisterUserValidationType;
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
        usrname: userCreated.username,
      });

      return res
        .status(201)
        .json({ user: { ...userCreated, password: "" }, token });
    } catch (error: any) {
      logger.error(error.message);
      return handleHttp(500, "INTERNAL_SERVER_ERROR", res);
    }
  }

  async login(req: Request, res: Response) {
    console.log(req.body);
    return res.json({ msg: "login" });
  }
}
