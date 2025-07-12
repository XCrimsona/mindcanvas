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
    <>
      <HeadingOne id="heading-one" className={home["heading-one"]}>
        MindCanvas
      </HeadingOne>
      <LongText className={home["paragraph"]}>
        The app that helps you bring efficiency and orgranization to your
        created data. MindCanvas is designed to transform your raw complex data
        into valueable, readble data using a range of different ways to display
        your information on your own terms from its built-in data oraganization
        features.
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
        Kind Reminder{"\u003a"}
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
