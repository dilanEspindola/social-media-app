import { Request, Response, NextFunction } from "express";
import { logger } from "../../logger";
import { handleHttp, validationError, verifyToken } from "../utils";

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    /**
     * @todo if pass here, validate if the code is working passing a valid token
     */
    const tokenVerified = verifyToken(token);

    return next();
  } catch (error: any) {
    logger.error(error.message);
    const { message, statusCode } = validationError(error.message);
    logger.error(message);
    return handleHttp(statusCode, message, res);
  }
};
