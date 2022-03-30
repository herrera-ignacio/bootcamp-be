import { Application } from "express";
import IMiddleware from "../types/IMiddleware";
import NotFoundHandler from "./NotFoundHandler";
import ClientErrorHandler from "./ClientErrorHandler";

/**
 * Mount error handling middleware
 * We usually want to mount them lastly or at least after routers.
 */
export default class ErrorHandler implements IMiddleware {
  public static mount(_express: Application) {
    NotFoundHandler.mount(_express);
    ClientErrorHandler.mount(_express);
  }
}
