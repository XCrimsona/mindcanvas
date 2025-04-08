"use client";
import PageFooter from "@/(home)/(components)/PageFooter";
import PageHeader from "@/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
const Analysis = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-content-analysis">
        <HeadingOne id="heading-one" className="heading-one">
          Content Analysis section 2
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Analysis;
