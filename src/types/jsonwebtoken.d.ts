declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: any;
  }

  export type SignOptions = {
    expiresIn?: string | number;
    algorithm?: string;
    [key: string]: any;
  };

  export type VerifyOptions = {
    algorithms?: string[];
    [key: string]: any;
  };

  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions,
  ): JwtPayload | string;

  export function decode(
    token: string,
    options?: { complete?: boolean; json?: boolean },
  ): null | JwtPayload | string;

  const jwt: {
    sign: typeof sign;
    verify: typeof verify;
    decode: typeof decode;
  };

  export default jwt;
}
