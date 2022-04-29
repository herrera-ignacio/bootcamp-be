import { Request } from "express";

export interface BookingCreateBody extends Record<string, string | number>{
  slotId: number;
  startDate: string;
  endDate: string;
  userId: number;
}

export interface BookingCreateRequest extends Request{
  body: BookingCreateBody;
}
