import { Request } from "express";

export interface RoomUpdateBody extends Record<string, string>{
  name: string,
}

export interface RoomUpdateRequest extends Request{
  body: RoomUpdateBody;
}
