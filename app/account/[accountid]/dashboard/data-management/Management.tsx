"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import PageHeader from "@/app/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";

const DataManagement = () => {
  return (
    <>
      <PageHeader />
      <Div className="data-management-content">
        <HeadingOne id="heading-one" className="heading-one">
          Data Management section 3
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default DataManagement;
