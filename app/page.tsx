import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import LongText from "@/src/ui/LongText";
import UL from "@/src/ui/UL";
import ListItem from "@/src/ui/ListItem";
import HeadingTwo from "@/src/ui/HeadingTwo";
import { Metadata } from "next";
import Signin from "./auth/signin/Signin";

export const metadata: Metadata = {
  title: "Signup Page",
  description:
    "Life Expansion is a platform that focuses on work efficiency, getting back your time by bringing all your work, ideas to an oragnized place.",
  robots: "index, follow",
  alternates: {
    canonical: "https://netlify.life-expansion.app/",
  },
  icons: {
    icon: "favicon.ico",
  },
};

// Home Page Dashboard
export default function Home() {
  const content: any = {
    //Introduction Summary of Tools used by app features
    designedFor: [
      "Personal Content Analysis",
      "Limited Desk Space",
      "Organizing Custom Data",
      "Enhancing work efficiency by keeping your data structured and accessible",
    ],

    //Distinct features avail when logged in
    features: [
      "Dynamic Image Editing",
      "Multi-Image Stacking and Layering",
      "Drag-and-Drop Image Interaction (like sticky notes on a whiteboard)",
      "Personalized Goal Setting",
      "Annual Planner Aligned with Goal Setting",
      "Fitness Tracking and Monitoring",
    ],
    ["privacy-security"]: [
      "We use cookies solely to help you track your data. We do not collect, store, or share your data with third parties, ensuring maximum privacy.",
      "All data related to individual accounts are encrypted which means admins cannot alter your data",
      "Life Expansion\u2019s privacy rules stand as a guard to ensure your information remains protected via encryption and security layers",
      "By this privacy rule life expansion performs database operations, that are analysis matrics to monitor for unauthorized logins, offensive database commands that may indicate potential cyber attacks to break into accounts, copy, modify, or destroy information",
      "Modern Authentication is highly recommended even as a closed project based platform",
    ],
  };

  return (
    <Div className="page">
      <HeadingOne id="heading-one" className="heading-one">
        Life Expansion
      </HeadingOne>
      <LongText className="paragraph">
        Welcome to Life Expansion. Life Expansion is a platform that focuses on
        work efficiency, getting back your time by bringing all your work, ideas
        to an organized place.
      </LongText>
      <HeadingTwo id="heading-two" className="heading-two">
        It{"\u2019"}s Designed for{"\u003a"}
      </HeadingTwo>
      <UL className="list">
        {content.designedFor.map((perfectDesign: string, key: number) => {
          return (
            <ListItem key={key} className="listitem">
              {perfectDesign}
            </ListItem>
          );
        })}
      </UL>
      <HeadingTwo id="heading-two" className="heading-two">
        Features{"\u003a"}
      </HeadingTwo>
      <Div className="list">
        {content.features.map((feature: string, key: number) => {
          return (
            <LongText key={key} className="privacy-statement">
              {feature}
            </LongText>
          );
        })}
      </Div>
      <HeadingTwo id="heading-two" className="heading-two">
        Life Expansion prioritizes privacy and security through the following
        measures{"\u003a"}
      </HeadingTwo>
      <UL className="list">
        {content["privacy-security"].map((feature: string, key: number) => {
          return (
            <ListItem key={key} className="listitem">
              {feature}
            </ListItem>
          );
        })}
      </UL>
      <Div className="sign-in-container">
        <Signin />
      </Div>
    </Div>
  );
}
