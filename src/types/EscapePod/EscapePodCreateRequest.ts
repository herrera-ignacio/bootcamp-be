import { Request } from "express";

export interface EscapePodCreateBody extends Record<string, string>{

}

export interface EscapePodCreateRequest extends Request{
  body: EscapePodCreateBody;
}
