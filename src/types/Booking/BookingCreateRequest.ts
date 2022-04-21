import { Request } from "express";

export type BookingCreateBody = Record<string, string>;

export interface BookingCreateRequest extends Request{
  body: BookingCreateBody;
}
