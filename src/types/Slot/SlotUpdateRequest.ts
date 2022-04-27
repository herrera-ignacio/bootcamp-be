import { Request } from "express";

export interface SlotUpdateBody extends Record<string, boolean>{
  isDisabled: boolean,
}

export interface SlotUpdateRequest extends Request{
  body: SlotUpdateBody;
}
