import Div from "@/src/ui/Div";
import { ReactNode } from "react";
import authstyles from "@/app/auth/auth.module.scss";
const AuthLayOut = ({ children }: { children: ReactNode }) => {
  return <Div className={authstyles["auth-layout"]}>{children}</Div>;
};

export default AuthLayOut;
