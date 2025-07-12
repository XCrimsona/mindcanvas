import Div from "@/src/ui/Div";
import Dashboard from "./Dashboard";
import { Metadata } from "next";
import dashboardStyling from "@/app/account/[accountid]/dashboard/dashboard.module.scss";

export const metadata: Metadata = {
  title: "Dashboard | MindCanvas",
};

const Page = () => {
  return (
    <Div className={dashboardStyling["account-dashboard"]}>
      <Dashboard />
    </Div>
  );
};

export default Page;
