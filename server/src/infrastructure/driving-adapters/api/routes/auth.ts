import { Router } from "express";
import { AuthController } from "../controllers";
import { validationMiddleware } from "../middlewares";
import { registerUserValidation } from "../utils/validations";
import { CreateUserUseCase } from "../../../../app/use-cases/user-cases";
import { TypeOrmUserRepository } from "../../../driven-adapters/database/implementations/typeorm-user-repository";

const router = Router();
const userRepository = new TypeOrmUserRepository();
const createUserDto = new CreateUserUseCase(userRepository);
const authController = new AuthController(createUserDto);

router.post(
  "/register",
  validationMiddleware(registerUserValidation),
  authController.register.bind(authController)
);

export { router };
