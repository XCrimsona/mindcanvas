import jwt, { SignOptions } from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

interface TokenPayload {
  email: string;
  role: string;
}

export class TokenService {
  #secret: string;
  #default: string;
  constructor(secret: string, defaultExpiry: string = "1h") {
    if (!secret || secret.length < 32) {
      throw new Error("JWT Secret is mssing or too weak");
    }

    this.#secret = secret;
    this.#default = defaultExpiry;
  }

  sign = (payload: TokenPayload, expiresIn?: any): string => {
    const options: SignOptions = {
      expiresIn: expiresIn || this.#default,
      algorithm: "HS256",
    };
    return jwt.sign(payload, this.#secret, options);
  };

  verify(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.#secret) as TokenPayload;
    } catch (err) {
      throw new Error("Invalid or expired token");
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
