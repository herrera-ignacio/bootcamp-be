import { Request } from "express";

export interface UserIdentity{
  nickname: string,
  email: string,
  emailVerified: string,
  picture: string
}

export interface RequesWithOIDC extends Request{
  user: UserIdentity;
}
