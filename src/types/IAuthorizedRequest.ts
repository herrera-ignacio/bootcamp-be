import { Request } from "express";
import { IReqAuth } from "./IReqAuthUser";

export interface IAuthorizedRequest extends Request{
  auth?: IReqAuth,
}

