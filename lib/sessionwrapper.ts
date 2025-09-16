import { withIronSessionApiRoute } from "iron-session/next";

import { ironOptions } from "./IronSessionOptions";

export function withSessionRoute(handler: any) {
  return withIronSessionApiRoute(handler, ironOptions);
}
