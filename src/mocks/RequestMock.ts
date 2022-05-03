import { Request } from "express";
import { AuthData } from "../types/Auth/RequestWithAuth";

export type RequestParams = {
  [k in "headers" | "params" | "query"]?: Record<string, string>;
} & {
  body?: string | boolean | number | object;
  auth?: AuthData;
};

const getRequestMock = <T= Request>(params: RequestParams = {}) => ({
  auth   : params.auth ?? {},
  body   : params.body ?? {},
  headers: params.headers ?? {},
  params : params.params ?? {},
  query  : params.query ?? {},
} as unknown as T
);

export default getRequestMock;
