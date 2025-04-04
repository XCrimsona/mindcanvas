import Div from "@/src/ui/Div";
import { Metadata } from "next";
import Signin from "./Signin";

export const metadata: Metadata = {
  title: "Signin Page",
  description: "Sign in for more access of life expansion's features",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://netlify.life-expansion.app/login",
  },
  icons: {
    icon: "favicon.ico",
  },
};

const page = () => {
  return (
    <Div className="sign-in-page">
      <Signin />
    </Div>
  );
};

export default page;
