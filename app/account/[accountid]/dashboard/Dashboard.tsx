"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import PageHeader from "@/app/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";

const Dashboard = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-dashboard-content">
        <p>Hello &lt;username&gt;</p>
      </Div>
      <PageFooter />
    </>
  );
};

export default Dashboard;
