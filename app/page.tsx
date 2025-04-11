import Div from "@/src/ui/Div";
import { Metadata } from "next";
import home from "@/app/(home)/(css)/home.module.scss";
import Home from "@/app/(home)/Home";

export const metadata: Metadata = {
  title: "Home | Life Expansion",
  description:
    "Life Expansion is a platform that focuses on work efficiency, getting back your time by bringing all your work, ideas to an oragnized place.",
  robots: "index, follow",
  alternates: {
    canonical: "https://vercel.life-expansion.app/",
  },
  icons: {
    icon: "favicon.ico",
  },
};

// Home Page Dashboard
export default function Page() {
  return (
    <Div className={home["page"]}>
      <Home />
    </Div>
  );
}
