import { Request } from "express";

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

export interface UserIdentity {
  nickname: string;
  email: string;
  emailVerified: string;
  picture: string;
}

export interface RequestWithOIDC extends Request {
  user: UserIdentity;
}
