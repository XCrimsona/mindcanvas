import PageFooter from "@/(home)/(components)/PageFooter";
import PageHeader from "@/(home)/(components)/PageHeader";
import Div from "@/src/ui/Div";
import Dashboard from "./Dashboard";

const Page = () => {
  return (
    <Div className="account-dashboard">
      <PageHeader />
      <Dashboard />
      <PageFooter />
    </Div>
  );
};

export default Page;
