import HttpException from "./HttpException";

/**
 * Not Found Http Exception
 */
export default class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(404, message ?? "Entity not found");
  }
}
