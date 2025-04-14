"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../AuthHeader";

const Info = () => {
  return (
    <>
      <AuthHeader />
      <Div className="account-info-content">
        <HeadingOne id="heading-one" className="heading-one">
          Account Info Start here
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Info;
