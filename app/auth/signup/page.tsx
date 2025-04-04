import Div from "@/src/ui/Div";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page",
  description:
    "Gain access to powerful tools | Analysis | Image Stacking | Goal setting | Fitness tracking and more | Register on Life Expansion Today",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://netlify.life-expansion.app/register",
  },
  icons: {
    icon: "favicon.ico",
  },
};

const Signup = () => {
  return (
    <Div className="sign-up-page">
      <Signup />
    </Div>
  );
};

export default Signup;
