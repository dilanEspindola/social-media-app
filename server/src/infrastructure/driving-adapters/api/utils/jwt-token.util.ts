import jwt from "jsonwebtoken";
import { JwtToken } from "../../../../domain/interfaces";
import { config } from "../../../../config";

interface JWTVerified extends jwt.JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const generateToken = <T extends object | string>(
  payload: T
): JwtToken => {
  const token = jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: "1d" });

  return { token };
};

export const verifyToken = (token: string): JWTVerified => {
  const tokenVerified = jwt.verify(token, config.SECRET_KEY_JWT) as JWTVerified;
  return tokenVerified;
};
