import { z } from "zod";

export const registerUserValidation = z.object({
  body: z.object({
    fullname: z
      .string({
        required_error: "fullname is required",
      })
      .min(3, { message: "fullname is too short" }),
    username: z
      .string({
        required_error: "username is required",
      })
      .min(3, { message: "username is too short" }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "it must be a valid email" }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, { message: "password must be at least 6 characters" }),
  }),
});

export const loginUserValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email("it must be a valid email"),
    password: z
      .string({ required_error: "password is required" })
      .min(6, { message: "password must be at least 6 characters" }),
  }),
});

export type RegisterUserValidationType = z.infer<
  typeof registerUserValidation
>["body"];

export type LoginUserValidationTyoe = z.infer<
  typeof loginUserValidation
>["body"];
