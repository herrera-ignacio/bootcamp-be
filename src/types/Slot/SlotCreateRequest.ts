import { Request } from "express";

export interface SlotCreateBody extends Record<string, string | boolean>{
  isDisabled: boolean,
}

export interface SlotCreateRequest extends Request{
  body: SlotCreateBody;
}
