"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";

import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import LongText from "@/src/ui/LongText";
const DataManagement = ({ params }: any) => {
  return (
    <>
      <Div className={management["data-management-content"]}>
        data
        {params.data.firstname}
      </Div>
      <PageFooter />
    </>
  );
};

export default DataManagement;
