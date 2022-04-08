import { Request } from "express";
import { UserRole } from "../../entities/User";

export interface UserCreateBody extends Record<string, string>{
  email: string;
  firstName?:string;
  lastName?: string;
  role:UserRole;
}

export interface UserCreateRequest extends Request{
  body: UserCreateBody;
}