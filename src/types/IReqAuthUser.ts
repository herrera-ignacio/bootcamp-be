
export interface IReqAuth{
  iss: string,
  sub: string,
  aud: Array<string>,
  iat: number,
  exp: number,
  azp: string,
  scope: string
}
