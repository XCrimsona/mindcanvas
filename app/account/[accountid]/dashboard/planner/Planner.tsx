import PageFooter from "@/app/(home)/(components)/PageFooter";
import PageHeader from "@/app/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";

const Planner = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-planner-content">
        <HeadingOne id="heading-one" className="heading-one">
          Year Planner and Goal Setting section 6
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Planner;
