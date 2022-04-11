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
<<<<<<< HEAD
  static use? = () => (
=======
  static get? = () => (
>>>>>>> 6f4ef28e4d7be5d9499e05d6b3fb5700aecb8404
    _req: Request, _res: Response, _next: NextFunction,
  ) => {
  };
}

export default IMiddleware;

