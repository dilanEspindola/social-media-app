import { Request, Response } from "express";

export interface ForUserController {
  getAllUsers(req: Request, res: Response): Promise<any>;
  createUser(req: Request, res: Response): Promise<any>;
}
