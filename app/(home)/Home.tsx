import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import LongText from "@/src/ui/LongText";
import UL from "@/src/ui/UL";
import ListItem from "@/src/ui/ListItem";
import HeadingTwo from "@/src/ui/HeadingTwo";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import home from "@/app/(home)/(css)/home.module.scss";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ShortText from "@/src/ui/ShortText";
// Home Page Dashboard
const Home = () => {
  const content: any = {
    //Introduction Summary of Tools used by app features
    designedFor: [
      "Simple to advanced content.",
      "Organizing your work and ideas.",
      "Security and Privacy.",
      "Pysically limited desk space. ",
    ],

    //Distinct features avail when logged in
    features: ["Data Management Editor"],
    ["privacy-security"]: [
      "Virtual Workspace Manager\u2019s privacy rules protect all users and their information by encrypting data of all inidividual accounts that even the admins cannot access.",
    ],
  };

  return (
    <>
      <HeadingOne id="heading-one" className={home["heading-one"]}>
        Workspace Manager
      </HeadingOne>
      <LongText className={home["paragraph"]}>
        The platform that focuses on your work efficiency needs, scoring back
        your time by bringing all your work, ideas to a transformative
        application that helps you organize your content to your liking.
      </LongText>
      <HeadingTwo
        id="heading-two-designedfor"
        className={home["heading-two-designedfor"]}
      >
        Designed for
      </HeadingTwo>
      <Div className={home["list-designed-for"]}>
        {content.designedFor.map((item: string, index: number) => {
          return (
            <LongText key={index} className={home["design"]}>
              {item}
            </LongText>
          );
        })}
      </Div>
      <HeadingTwo
        id="heading-two-features"
        className={home["heading-two-features"]}
      >
        Features{"\u003a"}
      </HeadingTwo>
      <Div className={home["list-features"]}>
        {content.features.map((feature: string, key: number) => {
          return (
            <LongText key={key} className={home["features"]}>
              {feature}
            </LongText>
          );
        })}
      </Div>
      <HeadingTwo
        id="heading-two-sec-and-priv"
        className={home["heading-two-sec-and-priv"]}
      >
        Workspace Manager prioritizes privacy and security through the following
        measures{"\u003a"}
      </HeadingTwo>
      <UL className={home["list-security-privacy"]}>
        {content["privacy-security"].map((list: string, key: number) => {
          return (
            <ListItem key={key} className={home["sec-priv-item"]}>
              {list}
            </ListItem>
          );
        })}
      </UL>
      <Div className={home["sign-in-container"]}>
        <RouteLink className={home["route-link"]} href="/auth/signin">
          Sign in
        </RouteLink>
      </Div>
      <Footer id="home-footer" className={home["home-footer"]}>
        <Div className={home["project-creator"]}>
          <ShortText className={home["creator"]}>
            Created by Christeen Fabian
          </ShortText>
        </Div>
      </Footer>
    </>
  );
};

export default Home;
