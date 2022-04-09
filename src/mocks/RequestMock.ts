import { Request } from "express";

export type RequestParams = {
  [k in "headers" | "params" | "query"]?: Record<string, string>;
} & {
  body?: Record<string, string | boolean | number>;
  auth?: Record<string, string | boolean | number>;
};

const getRequestMock = (params: RequestParams = {}) => ({
  body:params.body ?? {},
  headers: params.headers ?? {},
  params: params.params ?? {},
  query: params.query ?? {},
  auth: params.auth ?? {},
} as unknown as Request
);

export default getRequestMock;