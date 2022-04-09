/**
 * General purpose HTTP Exception
 */
export default class HttpException extends Error {
  public status: number;

  public message: string;

  constructor(
    status = 500, message = "Something went wrong!",
  ) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
