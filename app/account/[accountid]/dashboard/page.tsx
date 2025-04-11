import Div from "@/src/ui/Div";
import Dashboard from "./Dashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Dashboard",
};

const Page = () => {
  return (
    <Div className="account-dashboard">
      <Dashboard />
    </Div>
  );
};

export default Page;
