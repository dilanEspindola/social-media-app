import { Router } from "express";
import { UserCotroller } from "../controllers/user.controller";
import {
  GetAllUsersUseCase,
  CreateUserUseCase,
} from "../../../../app/use-cases/user-cases";
import { TypeOrmUserRepository } from "../../../driven-adapters/database/implementations/typeorm-user-repository";

const router = Router();
const userRespository = new TypeOrmUserRepository();
const getAllUserUseCase = new GetAllUsersUseCase(userRespository);
const createUserUseCase = new CreateUserUseCase(userRespository);
const userController = new UserCotroller(getAllUserUseCase, createUserUseCase);

router.get("/", userController.getAllUsers.bind(userController));
router.post("/", userController.createUser.bind(userController));

export { router };
