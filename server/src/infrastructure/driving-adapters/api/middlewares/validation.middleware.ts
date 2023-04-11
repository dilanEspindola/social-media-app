import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validationMiddleware =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        parmas: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            message: issue.message,
            statusCode: 400,
          }))
        );
      }
      return res.status(400).json({ message: "BAD_REQUEST" });
    }
  };
