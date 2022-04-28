import { Request } from "express";

export type BookingUpdateBody = Record<string, string | number>;

export interface EscapePodUpdateRequest extends Request{
  body: BookingUpdateBody;
}
