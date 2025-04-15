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
      "Analyzing complex data.",
      "Security and Privacy.",
      "Setting goals and personal milestones.",
      "Simple to Advanced notes.",
      "Limited Desk Space. ",
      "Complex data structures.",
      "Taking your work efficiency to the next level.",
      "Tracking your overall health in fitness.",
    ],

    //Distinct features avail when logged in
    features: [
      "Data Management Board Editor",
      "Styling Hub | Image Editor",
      "Daily to Yearly User Customized Planner",
      "Built-in Fitness App",
    ],
    ["privacy-security"]: [
      "Life Expansion use cookies to help you track your data. It stores your data with cloud providers such as mongoDB, and azure cloud. We have a privacy policy that states we stricly refuse to share any of your data with other third parties who sell personal data behind the scenes.",
      "Life Expansion\u2019s privacy rules protect all users and their information by encrypting data of all inidividual accounts that even the admins cannot access as the security key of all those accounts decrypting data is kept by the user.",
      "By having privacy rules in place, life expansion performs database operations that analyze metrics to monitor for unauthorized logins, offensive database commands that may indicate potential cyber attacks to break into accounts, attempying to gain access to copy, modify, or destroy information. Life expansion cannot scan your data in any way.",
      "Multi Factor Authentication is highly recommended.",
    ],
  };

  return (
    <>
      <Header id="home-header" className="home-header">
        {/* select requires integration with the themeprovider */}
        <select id="color-theme" className="color-theme">
          <option>Select your preference</option>
          <optgroup>
            <option value={"system"}>system</option>
            <option value={"light"}>Light</option>
            <option value={"dark"}>Dark</option>
          </optgroup>
          <optgroup>
            <option value={"beige"}>Beige</option>
            <option value={"light-pink"}>Light Pink</option>
            <option value={"dark-maroon"}>Dark Maroon</option>
            <option value={"dark-pink"}>Dark Pink</option>
            <option value={"cyan-blue"}>Cyan Blue</option>
            <option value={"grey"}>Grey</option>
            <option value={"ash"}>Ash</option>
          </optgroup>
        </select>
      </Header>
      <HeadingOne id="heading-one" className={home["heading-one"]}>
        Life Expansion
      </HeadingOne>
      <LongText className={home["paragraph"]}>
        The platform that focuses on your work efficiency needs, scoring back
        your time by bringing all your work, ideas to an organized location.
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
        {/* <IntroTyped /> */}
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
        Life Expansion prioritizes privacy and security through the following
        measures{"\u003a"}
      </HeadingTwo>
      <UL className={home["list-security-privacy"]}>
        {content["privacy-security"].map((priv: string, key: number) => {
          return (
            <ListItem key={key} className={home["sec-priv-item"]}>
              {priv}
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
