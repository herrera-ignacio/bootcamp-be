import HttpException from "./HttpException";

export default class NotAuthorizedException extends HttpException {

  constructor(msg?: string) {
    super(
      403, msg ?? "Access denied: Not enough permissions",
    );
  }
}
