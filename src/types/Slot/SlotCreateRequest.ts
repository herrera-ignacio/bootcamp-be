import { Request } from "express";

export interface SlotCreateBody extends Record<string, boolean  | number>{
  roomId: number,
  isDisabled: boolean,
}

export interface SlotCreateRequest extends Request{
  body: SlotCreateBody;
}
