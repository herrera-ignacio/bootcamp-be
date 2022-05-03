import { Request } from "express";

export interface RoomUpdateBody extends Record<string, string | boolean>{
  name?: string,
  isDisabled?: boolean,
}

export interface RoomUpdateRequest extends Request{
  body: RoomUpdateBody;
}
