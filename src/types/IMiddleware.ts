import {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";

abstract class IMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static mount?(_express: Application): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  static use? = () => (

    _req: Request, _res: Response, _next: NextFunction,
  ) => {
  };
}

export default IMiddleware;

