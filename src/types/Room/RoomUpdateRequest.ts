import { Request } from "express";

export interface RoomUpdateBody {
  name?: string,
  isDisabled?: boolean,
}

export interface RoomUpdateRequest extends Request{
  body: RoomUpdateBody;
}
