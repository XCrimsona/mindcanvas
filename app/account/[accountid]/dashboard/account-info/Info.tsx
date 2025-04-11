"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import PageHeader from "@/app/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";

const Info = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-info-content">
        <HeadingOne id="heading-one" className="heading-one">
          Account Info section 1
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Info;
