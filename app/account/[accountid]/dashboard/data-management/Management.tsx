"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../(auth-header)/AuthHeader";

const DataManagement = () => {
  return (
    <>
      <AuthHeader />
      <Div className="data-management-content">
        <HeadingOne id="heading-one" className="heading-one">
          Data Management section 3 | Coming Soon
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default DataManagement;
