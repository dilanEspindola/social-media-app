import { User } from "../entities/user";

export type CreateUserDto = Pick<
  User,
  "email" | "fullname" | "username" | "password"
>;
