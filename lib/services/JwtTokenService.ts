import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  role: string;
}

export class TokenService {
  #jwtsecret: string = process.env.JWT_SECRET!;

  sign = (payload: TokenPayload, expiresIn?: any): string => {
    const options: SignOptions = {
      expiresIn: expiresIn || "1h",
      algorithm: "HS256",
    };
    return jwt.sign(payload, this.#jwtsecret, options);
  };

  verify(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.#jwtsecret) as TokenPayload;
    } catch (err: any) {
      throw new Error("Invalid or expired token: ", err.message);
    }
  }

  requireRole(token: string, allowedRoles: string[]): TokenPayload {
    const payload = this.verify(token);
    if (!allowedRoles.includes(payload.role)) {
      throw new Error("Access Denied: insufficient privileges");
    }
    return payload;
  }
}
