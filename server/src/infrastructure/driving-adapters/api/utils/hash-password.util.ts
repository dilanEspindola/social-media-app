import bcrypt from "bcryptjs";
import { EncryptPassword } from "../../../../domain/interfaces";

export class EncryptAndValidatePassword implements EncryptPassword {
  private readonly salt: number;

  constructor() {
    this.salt = 9;
  }

  hashPassword = async (password: string): Promise<string> => {
    const generateHash = await bcrypt.hash(password, this.salt);
    return generateHash;
  };

  validatePassword = async (
    password: string,
    hash: string
  ): Promise<boolean> => {
    const comparePassword = await bcrypt.compare(password, hash);
    return comparePassword;
  };
}
