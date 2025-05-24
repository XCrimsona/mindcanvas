export const ironOptions = {
  cookieName: "workspace-session",
  password: process.env.IRON_SESSION_SECRET! as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "development", // Use secure cookies in production
    sameSite: "strict", // CSRF protection
    maxAge: 60 * 60, //1hour
  },
};
