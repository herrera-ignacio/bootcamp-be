import { Request } from "express";

export type EscapePodCreateBody = Record<string, string | number>;

export interface EscapePodCreateRequest extends Request{
  body: EscapePodCreateBody;
}
