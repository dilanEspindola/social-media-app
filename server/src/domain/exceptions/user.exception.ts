export class UserNotFoundException extends Error {
  constructor() {
    super("USER_NOT_FOUND");
  }
}

export class UserExistException extends Error {
  constructor() {
    super("USER_ALREADY_EXIST");
  }
}
