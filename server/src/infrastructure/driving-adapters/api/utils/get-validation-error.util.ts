interface ReturnValidationError {
  message: string;
  statusCode: number;
}

interface TypeWithKey {
  [key: string]: ReturnValidationError;
}

export const validationError = (error: any): ReturnValidationError => {
  const codeMatcher: TypeWithKey = {
    USER_NOT_FOUND: { message: "User not found", statusCode: 404 },
    USER_ALREADY_EXIST: { message: "User already exists", statusCode: 409 },
    "invalid token": { message: "Unauthorized", statusCode: 401 },
    "jwt must be provided": { message: "Unauthorized", statusCode: 401 },
    "jwt malformed": { message: "Unauthorized", statusCode: 401 },
    "jwt expired": { message: "Unauthorized", statusCode: 401 },
  };

  const defaultError: ReturnValidationError = {
    message: "Something went wrong",
    statusCode: 500,
  };

  return codeMatcher[error] ?? defaultError;
};
