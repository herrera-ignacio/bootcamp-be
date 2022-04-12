import { Request } from "express";

export type EscapePodCreateBody = Record<string, string>;

export interface EscapePodCreateRequest extends Request{
  body: EscapePodCreateBody;
}
