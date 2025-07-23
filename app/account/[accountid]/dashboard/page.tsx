import Div from "@/src/ui/Div";
import Dashboard from "./Dashboard";
import { Metadata } from "next";
import dashboardStyling from "@/app/style-files/dashboard.module.scss";
import { getDB } from "@/lib/connnections/Connections";

export const metadata: Metadata = {
  title: "Dashboard | MindCanvas",
};

const Page = async () => {
  await getDB();
  return (
    <Div className={dashboardStyling["account-dashboard"]}>
      <Dashboard />
    </Div>
  );
};

export default Page;
