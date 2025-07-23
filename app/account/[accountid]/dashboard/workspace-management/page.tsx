import Div from "@/src/ui/Div";
import DataManagement from "./DataManagement";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../(auth-header)/AuthHeader";
import management from "@/app/style-files/management.module.scss";
import AuthFooter from "../(auth-footer)/AuthFooter";
import LongText from "@/src/ui/LongText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canva Management | MindCanvas",
};

const fetchSheetData = async (accountid: string) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/workspace-management`
  );
  const data = await response.json();
  if (data.success !== true) {
    switch (data.code) {
      case "NO_WORKSPACE_DATA":
        return {
          status: "empty",
          message: data.message,
        };
      case "NO_USER_DATA":
        return {
          status: "empty",
          message: data.message,
        };
      default:
        console.log("route error");

        return {
          status: "error",
          message: data.message || "Unhandled backend condition.",
        };
    }
  }

  return {
    status: "success",
    data: data.data,
  };
};

const Page = async ({ params }: any) => {
  const { accountid } = await params;
  const info = await fetchSheetData(String(accountid));

  if (info.status === "error") {
    return (
      <Div className={management["main-workspace-management-container"]}>
        <AuthHeader />

        <LongText className={management["workspace-data-error-text"]}>
          {info.message}
        </LongText>

        <AuthFooter />
      </Div>
    );
  }

  if (info.status === "empty") {
    return (
      <Div className={management["main-workspace-management-container"]}>
        <AuthHeader />
        <LongText className={management["workspace-data-error-text"]}>
          {info.message}
        </LongText>
        <AuthFooter />
      </Div>
    );
  }

  const data = {
    info,
    accountid,
  };
  return (
    <Div className={management["main-workspace-management-container"]}>
      <AuthHeader />
      <Div className={management["heading-container"]}>
        <HeadingOne id="heading-one" className={management["heading-one"]}>
          Canvas Management
        </HeadingOne>
      </Div>
      <DataManagement params={data} />
      <AuthFooter />
    </Div>
  );
};

export default Page;
