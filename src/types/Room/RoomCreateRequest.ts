import { Request } from "express";

export interface RoomCreateBody extends Record<string, string | boolean>{
  name: string,
  isDisabled: boolean;
}

export interface RoomCreateRequest extends Request{
  body: RoomCreateBody;
}
