// import jwt, { SignOptions } from "jsonwebtoken";
// import { getSecret } from "../lib/azure-keyvault";
// import session from "express-session";
// interface TokenPayload {
//   sub: string;
//   role: string;
// }

// export class TokenService {
//   #jwtsecret = process.env.JWT!;
//   sign = (payload: TokenPayload) => {
//     try {
//       const key: any = jwt.sign(payload, this.#jwtsecret!, {
//         expiresIn: "1h",
//       });
//       return key;
//     } catch (err: any) {
//       throw new Error("Invalid or expired token: ", err.message);
//     }
//   };

//   verify = (token: string) => {
//     try {
//       return jwt.verify(token, this.#jwtsecret!) as TokenPayload;
//     } catch (err: any) {
//       throw new Error("Invalid or expired token: ", err.message);
//     }
//   };

//   requireRole = (token: string, allowedRoles: string[]) => {
//     const payload = this.verify(token);
//     if (!allowedRoles.includes(payload.role)) {
//       throw new Error("Access Denied: insufficient privileges");
//     }
//     return payload;
//   };
// }
