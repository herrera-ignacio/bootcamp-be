import { Request } from "express";

export interface UserIdentity{
  email: string,
  emailVerified: string,
  nickname: string,
  picture: string
}

export interface RequesWithOIDC extends Request{
  user: UserIdentity;
}
