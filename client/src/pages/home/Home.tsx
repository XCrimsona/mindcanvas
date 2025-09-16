import { DivClass } from "../../../src/ui/Div";
import HeadingOne from "../../../src/ui/HeadingOne";
import LongText from "../../../src/ui/LongText";
import UL from "../../../src/ui/UL";
import ListItem from "../../../src/ui/ListItem";
import HeadingTwo from "../../../src/ui/HeadingTwo";
import RouteLink from "../../../src/components/ProductSection/RouteLink";
import "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import ShortText from "../../../src/ui/ShortText";
import "./(css)/home.css";

// Home Page Dashboard
const Home = () => {
  const content = {
    //Introduction Summary of Tools used by app features
    designedFor: [
      "Content creation.",
      "Security and Privacy.",
      "Physically limited desk space. ",
    ],

    //Distinct features avail when logged in
    features: [
      "Up to 10k characters in a single data item.",
      "Draggable User Content",
      "Editable User Content",
      "Multimedia type support",
    ],
    ["privacy-security"]: [
      "MindCanvas\u2019s privacy rules protect all users and their information by encrypting data of all inidividual accounts that even the admins cannot access. This means if you cannot reset your password with your custom  security questions you chose, your account is practically locked, therefore MindCanvas will not be liable for such events.",
    ],
  };

  return (
    <DivClass className="page">
      <HeadingOne id="heading-one" className="heading-one">
        MindCanvas
      </HeadingOne>
      <LongText className="paragraph">
        The app that helps you bring efficiency and orgranization to your
        created data. MindCanvas is designed to transform your raw complex data
        into valueable, readble data using a range of different ways to display
        your information on your own terms from its built-in data oraganization
        features.
      </LongText>
      <HeadingTwo
        id="heading-two-designedfor"
        className="heading-two-designedfor"
      >
        Designed for
      </HeadingTwo>
      <DivClass className={"list-designed-for"}>
        {content.designedFor.map((item: string, index: number) => {
          return (
            <LongText key={index} className={"design"}>
              {item}
            </LongText>
          );
        })}
      </DivClass>
      <HeadingTwo id="heading-two-features" className={"heading-two-features"}>
        Features{"\u003a"}
      </HeadingTwo>
      <DivClass className={"list-features"}>
        {content.features.map((feature: string, key: number) => {
          return (
            <LongText key={key} className={"features"}>
              {feature}
            </LongText>
          );
        })}
      </DivClass>
      <HeadingTwo
        id="heading-two-sec-and-priv"
        className={"heading-two-sec-and-priv"}
      >
        Kind Reminder{"\u003a"}
      </HeadingTwo>
      <UL className={"list-security-privacy"}>
        {content["privacy-security"].map((list: string, key: number) => {
          return (
            <ListItem key={key} className={"sec-priv-item"}>
              {list}
            </ListItem>
          );
        })}
      </UL>
      <DivClass className={"sign-in-container"}>
        <RouteLink className={"route-link"} href="/auth/signin">
          Sign in
        </RouteLink>
      </DivClass>
      <Footer id="home-footer" className={"home-footer"}>
        <DivClass className={"project-creator"}>
          <ShortText className={"creator"}>
            Created by Christeen Fabian
          </ShortText>
        </DivClass>
      </Footer>
    </DivClass>
  );
};

export default Home;
