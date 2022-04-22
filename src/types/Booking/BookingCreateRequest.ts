import { Request } from "express";

export type BookingCreateBody = Record<string, string | number>;

export interface BookingCreateRequest extends Request{
  body: BookingCreateBody;
}
