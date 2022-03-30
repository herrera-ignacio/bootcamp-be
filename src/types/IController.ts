import { IRequestHandler } from "./IRequestHandler";

export interface IController {
  getById?: IRequestHandler;
  create?: IRequestHandler;
  updateById?: IRequestHandler;
  deleteById?: IRequestHandler;
}
