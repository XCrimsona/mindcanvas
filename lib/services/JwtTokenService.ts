import jwt, { SignOptions } from "jsonwebtoken";
import { getSecret } from "@/lib/azure-keyvault";
import session from "express-session";
interface TokenPayload {
  sub: string;
  role: string;
}

export class TokenService {
  #jwtsecret = process.env.JWT!;
  // #jwtsecret =await getSecret("JWT")!;
  // constructor(jwt: string) {
  // this.#jwtsecret = await getSecret("JWT")!;
  // }
  sign = async (payload: TokenPayload): Promise<string> => {
    try {
      const key: any = jwt.sign(payload, this.#jwtsecret!, {
        expiresIn: "1h",
      });
      return key;
    } catch (err: any) {
      throw new Error("Invalid or expired token: ", err.message);
    }
  };

  verify = async (token: string): Promise<TokenPayload> => {
    try {
      return jwt.verify(token, this.#jwtsecret!) as TokenPayload;
    } catch (err: any) {
      throw new Error("Invalid or expired token: ", err.message);
    }
  };

  requireRole = async (
    token: string,
    allowedRoles: string[]
  ): Promise<TokenPayload> => {
    const payload = await this.verify(token);
    if (!allowedRoles.includes(payload.role)) {
      throw new Error("Access Denied: insufficient privileges");
    }
    return payload;
  };
}
