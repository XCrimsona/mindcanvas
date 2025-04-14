import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../AuthHeader";

const Planner = () => {
  return (
    <>
      <AuthHeader />
      <Div className="account-planner-content">
        <HeadingOne id="heading-one" className="heading-one">
          Year Planner and Goal Setting section 6 | Coming Soon
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Planner;
