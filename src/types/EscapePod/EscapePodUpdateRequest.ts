import { Request } from "express";

export type EscapePodUpdateBody = Record<string, string>;

export interface EscapePodUpdateRequest extends Request{
  body: EscapePodUpdateBody;
}
