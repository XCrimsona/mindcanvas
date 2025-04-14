import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import Info from "./Info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Info",
  description: "Read and modify you data safely",
};
const Page = () => {
  return (
    <Div className="account-info">
      <Info />
    </Div>
  );
};

export default Page;
