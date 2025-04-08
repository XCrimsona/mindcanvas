"use client";
import PageFooter from "@/(home)/(components)/PageFooter";
import PageHeader from "@/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
const Dashboard = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-dashboard-content">
        <p>Account Dashboard</p>
      </Div>
      <PageFooter />
    </>
  );
};

export default Dashboard;
