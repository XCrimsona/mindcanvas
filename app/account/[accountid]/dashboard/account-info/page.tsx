import Div from "@/src/ui/Div";
import Info from "./Info";
import { Metadata } from "next";
import info from "@/app/account/[accountid]/dashboard/account-info/(css)/info.module.scss";

export const metadata: Metadata = {
  title: "Account Info",
  description: "Read and modify you data safely",
};

const FetchUserInfo = async (accountid: string) => {
  const response: any = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/account-info`
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
  // const data = await FetchUserInfo(String(accountid));
  // console.log("params: ", JSON.stringify(accountid));

  return (
    <Div className={info["account-info"]}>
      <Info params={data} />
    </Div>
  );
};

export default Page;
