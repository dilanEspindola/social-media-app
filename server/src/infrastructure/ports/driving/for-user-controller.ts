import { Request, Response } from "express";

export interface ForUserController {
  getAllUsers(req: Request, res: Response): Promise<any>;
  getUserByUsername(req: Request, res: Response): Promise<any>;
  getUserById(req: Request, res: Response): Promise<any>;
}
