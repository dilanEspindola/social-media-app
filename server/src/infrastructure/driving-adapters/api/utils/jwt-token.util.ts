import jwt from "jsonwebtoken";
import { JwtToken } from "../../../../domain/interfaces";

export const generateToken = <T extends object | string>(
  payload: T
): JwtToken => {
  const secretKey = "13435fg";
  const token = jwt.sign(payload, secretKey);

  return { token };
};
