import session from "express-session";
import connectMongo from "connect-mongo";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedRequest extends NextApiRequest {
  sessionID?: string;
}
export class SessionService {
  private readonly sessionMiddleware: ReturnType<typeof session>;

  constructor() {
    this.sessionMiddleware = session({
      secret: process.env.JWT_SECRET!,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: false, // set to true in prod behind HTTPS
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      },
      store: connectMongo.create({
        mongoUrl: process.env.DB_CONNECTION_STRING!,
        ttl: 3600,
        autoRemove: "interval",
        autoRemoveInterval: 10,
      }),
    });
  }

  public async createNewSession(
    req: ExtendedRequest,
    res: NextApiResponse
  ): Promise<void> {
    const sessionId = req.headers?.authorization?.replace("Session ", "");
    if (sessionId) {
      req.sessionID = sessionId;
    }

    return new Promise<void>((resolve, reject) => {
      this.sessionMiddleware(req as any, res as any, (err: any) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
