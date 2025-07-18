import Div from "@/src/ui/Div";
import { Metadata } from "next";
import authstyles from "@/app/style-files/auth.module.scss";
import Signup from "./signup";

export const metadata: Metadata = {
  title: "Signup Page",
  description:
    "Need a serious work environment upgrade? Workspace Manager provides a powerful tool to help you streamline your workflow.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "",
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
