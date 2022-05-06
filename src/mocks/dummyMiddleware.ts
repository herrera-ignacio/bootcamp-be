import {
  Request,
  Response,
  NextFunction,
} from "express";

const dummyMiddleware = (
  _req: Request, _res: Response, next: NextFunction,
) => {
  next();
  return Promise.resolve();
};

export default dummyMiddleware;
