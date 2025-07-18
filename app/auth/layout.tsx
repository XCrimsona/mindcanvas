import Div from "@/src/ui/Div";
import { ReactNode } from "react";
import authstyles from "@/app/style-files/auth.module.scss";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <Div className={authstyles["auth-layout"]}>{children}</Div>;
};

export default AuthLayout;
