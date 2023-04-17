import { Request, Response } from "express";

export interface ForAuthenticateController {
  register(req: Request, res: Response): Promise<any>;
  login(req: Request, res: Response): Promise<any>;
  loginGoogle(req: Request, res: Response): Promise<any>;
  loginGoogleCallback(req: Request, res: Response): Promise<any>;
}
