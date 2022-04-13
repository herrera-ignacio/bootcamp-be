import HttpException from "./HttpException";

/**
 * Not Found Http Exception
 */
export default class NotImplementedException extends HttpException {
  constructor(message?: string) {
    super(
      501,
      message ?? "Function not implemented",
    );
  }
}
