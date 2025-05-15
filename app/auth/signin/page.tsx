import Div from "@/src/ui/Div";
import { Metadata } from "next";
import Signin from "./Signin";
import authstyles from "@/app/auth/auth.module.scss";

export const metadata: Metadata = {
  title: "Signin Page",
  description: "Sign in for more access of life expansion's features",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://vercel.life-expansion.app/login",
  },
  icons: {
    icon: "favicon.ico",
  },
};

const Page = async () => {
  await fetch("http:localhost:3000/api/signin");
  return (
    <Div className={authstyles["sign-in-page"]}>
      <Signin />
    </Div>
  );
};

export default Page;
