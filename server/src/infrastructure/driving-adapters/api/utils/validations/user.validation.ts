import { z } from "zod";

export const getUserByUsernameValidation = z.object({
  query: z.object({
    username: z.string({ required_error: "username is required" }),
  }),
});
