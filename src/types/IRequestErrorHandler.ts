import {
  NextFunction,
  Request,
  Response,
} from "express";

export type IRequestErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
