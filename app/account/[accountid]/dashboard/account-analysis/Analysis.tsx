"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import AuthHeader from "@/app/account/[accountid]/dashboard/AuthHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
const Analysis = () => {
  return (
    <>
      <AuthHeader />
      <Div className="account-content-analysis">
        <HeadingOne id="heading-one" className="heading-one">
          Content Analysis section 2 | Coming Soon
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Analysis;
