import HttpException from "./HttpException";

export default class NotAuthenticatedException extends HttpException {

  constructor(msg?: string) {
    super(
      401, msg ?? "Authentication failed",
    );
  }
}

