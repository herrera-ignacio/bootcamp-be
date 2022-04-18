import { Request } from "express";

export type RoomUpdateBody = Record<string, string>;

export interface RoomUpdateRequest extends Request{
  body: RoomUpdateBody;
}
