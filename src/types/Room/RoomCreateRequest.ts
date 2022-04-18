import { Request } from "express";

export interface RoomCreateBody extends Record<string, string>{
  name: string,
}

export interface RoomCreateRequest extends Request{
  body: RoomCreateBody;
}
