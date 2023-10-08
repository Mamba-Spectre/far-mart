exports.apiFailureMessage = {
  USER_ALREADY_EXISTS: "User already exists",
  FILE_NOT_FOUND: "File not found",
  USER_NOT_FOUND: "User not found",
  FILE_UPLOAD_ERROR: "Error while uploading file",
  INCORRECT_PASSWORD: "Incorrect Password",
  TOKEN_NOT_PROVIDED: "Token not provided",
  AUTHENTICATION_FAILED: "Authentication Failed",
};

exports.apiSuccessMessage = {
  USER_SAVED_SUCCESSFULLY: "User added successfully",
  USER_LOGGED_IN_SUCCESSFULLY: "User logged in successfully",
  FILE_CREATED_SUCCESSFULLY: "File uploaded successfully",
  FILE_DELETED_SUCCESSFULLY: "File deleted successfully",
  FILE_FETCHED_SUCCESSFULLY: "File fetched successfully",
};

exports.statusCodes = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
