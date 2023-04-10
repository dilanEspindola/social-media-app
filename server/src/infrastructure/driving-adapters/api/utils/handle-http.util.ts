import { Response } from "express";

export const handleHttp = (
  statusCode: number,
  message: string,
  res: Response
) => {
  res.status(statusCode).json({ message });
};
