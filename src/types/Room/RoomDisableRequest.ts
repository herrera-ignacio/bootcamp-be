import { Request } from "express";

export interface RoomDisableBody extends Record<string, boolean>{
  isDisabled: boolean,
}

export interface RoomUpdateRequest extends Request{
  body: RoomDisableBody;
}
