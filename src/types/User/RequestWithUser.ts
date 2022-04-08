import { Request } from "express";

export interface UserIdentity{
  nickname: string,
  email:string,
  email_verified: string,
  picture: string
}

export interface RequesWithOIDC extends Request{
  user: UserIdentity;
}