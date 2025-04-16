"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../(auth-header)/AuthHeader";

const Fitness = () => {
  return (
    <>
      <AuthHeader />
      <Div className="account-fitness-tracking-content">
        <HeadingOne id="heading-one" className="heading-one">
          Fitness section 5 | Coming Soon
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default Fitness;
