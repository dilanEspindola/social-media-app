import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers";
import { validationMiddleware } from "../middlewares";
import {
  loginUserValidation,
  registerUserValidation,
} from "../utils/validations";
import {
  CreateUserUseCase,
  GetUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { TypeOrmUserRepository } from "../../../driven-adapters/database/implementations/typeorm-user-repository";

const router = Router();
const userRepository = new TypeOrmUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const authController = new AuthController(createUserUseCase, getUserUseCase);

router.post(
  "/register",
  validationMiddleware(registerUserValidation),
  authController.register.bind(authController)
);
router.post(
  "/login",
  validationMiddleware(loginUserValidation),
  authController.login.bind(authController)
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  authController.loginGoogle.bind(authController)
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4000/api/auth/login",
  }),
  authController.loginGoogleCallback.bind(authController)
);

export { router };
