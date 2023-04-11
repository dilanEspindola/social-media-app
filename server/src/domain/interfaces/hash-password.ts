export interface EncryptPassword {
  hashPassword: (password: string) => Promise<string>;
  validatePassword: (password: string, hash: string) => Promise<boolean>;
}
