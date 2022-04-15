import { Request } from "express";

export type RoomCreateBody = Record<string, string>;

export interface EscapePodCreateRequest extends Request{
  body: RoomCreateBody;
}
