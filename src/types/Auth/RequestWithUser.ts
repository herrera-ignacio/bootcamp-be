import { Request } from "express";
import { UserIdentity } from "../User/RequestWithUser";

export interface RequestWithAuth extends Request {
  auth: {
    iss: string;
    sub: string;
    aud: string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
  }
}

export interface RequestWithOIDC extends Request {
  user: UserIdentity;
}
