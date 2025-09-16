import Div from "../../../../ui/Div";
import Info from "./Info";
import { Metadata } from "next";
import info from "../app/style-files/info.module.scss";

export const metadata: Metadata = {
  title: "Account Info",
  description: "Read and modify you data safely",
};

const FetchUserInfo = async (accountid: string) => {
  const response: any = await fetch(
    `http://localhost:3000/api/account/${accountid}/account-info`
  );
  if (response.ok) {
    return await response.json();
  } else {
    console.warn("Failed to retrieve, try again in 3 minutes");
  }
};

const Page = async ({ params }: any) => {
  const { accountid }: any = await params;
  const data = await FetchUserInfo(String(accountid));

  return (
    <Div className={info["account-info"]}>
      <Info params={data} />
    </Div>
  );
};

export default Page;
