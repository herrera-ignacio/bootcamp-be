import { Request } from "express";
import { UserRole } from "../../entities/User";

export interface UserUpdateBody extends Record<string, string>{
  email?: string;
  firstName?:string;
  lastName?: string;
  role?:UserRole;
}

export interface UserUpdateRequest extends Request{
  body: UserUpdateBody;
}