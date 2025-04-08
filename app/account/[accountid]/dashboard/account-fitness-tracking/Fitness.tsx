"use client";
import PageFooter from "@/(home)/(components)/PageFooter";
import PageHeader from "@/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";

const Fitness = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-fitness-tracking-content">
        <HeadingOne id="heading-one" className="heading-one">
          Fitness section
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Fitness;
