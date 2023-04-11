import { Router } from "express";
import { UserCotroller } from "../controllers/user.controller";
import {
  GetAllUsersUseCase,
  GetUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { TypeOrmUserRepository } from "../../../driven-adapters/database/implementations/typeorm-user-repository";
import { validationMiddleware, verifyTokenMiddleware } from "../middlewares";
import { getUserByUsernameValidation } from "../utils/validations";

const router = Router();
const userRespository = new TypeOrmUserRepository();
const getAllUserUseCase = new GetAllUsersUseCase(userRespository);
const getUserUseCase = new GetUserUseCase(userRespository);
const userController = new UserCotroller(getAllUserUseCase, getUserUseCase);

router.get("/", userController.getAllUsers.bind(userController));
router.get(
  "/username",
  validationMiddleware(getUserByUsernameValidation),
  userController.getUserByUsername.bind(userController)
);
router.get("/:id", userController.getUserById.bind(userController));

export { router };
