import Div from "@/src/ui/Div";
import { Metadata } from "next";
import authstyles from "@/app/auth/auth.module.scss";
import Signup from "./signup";

export const metadata: Metadata = {
  title: "Signup Page",
  description:
    "Need a flexible work environment? Life Expansion provides powerful tools help you streamline your workflow. Contact admins to sign up today",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://vercel.life-expansion.app/auth/sign-up-page",
  },
  icons: {
    icon: "favicon.ico",
  },
};

const Page = async () => {
  await fetch("http:localhost:3000/api/signup");

  return (
    <Div className={authstyles["sign-up-page"]}>
      <Signup />
    </Div>
  );
};

export default Page;
