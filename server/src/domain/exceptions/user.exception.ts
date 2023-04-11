export class UserNotFoundException extends Error {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
