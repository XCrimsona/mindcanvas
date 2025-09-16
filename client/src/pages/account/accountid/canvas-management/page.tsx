import Div from "../../../../ui/Div";
import Dashboard from "./Dashboard";
import HeadingOne from "../../../../ui/HeadingOne";
import AuthHeader from "../../../../../auth/auth-partials/AuthHeader";
import management from "../../../../../app/style-files/management.module.scss";
import LongText from "../../../../ui/LongText";
import { getDB } from "../../../../../server/lib/connnections/Connections";
import AuthFooter from "../../../../../auth/auth-partials/AuthFooter";
import { useEffect } from "react";
// import apiURL from "../../../../../utils/API_URL";

const fetchSheetData = async (accountid: string) => {
  const response = await fetch(
    // `http://localhost:3000/api/account/${accountid}/dashboard/canvas-management`
    `http://localhost:some/api/account/${accountid}/canvas-management`
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

const Page = async ({ params }: { params: any }) => {
  await getDB();
  useEffect(() => {
    document.title = "Canva Dashboard | MindCanvas";
  }, []);
  const { accountid } = await params;
  const info = await fetchSheetData(String(accountid));
  const data = {
    info,
    accountid,
  };
  console.log("data text: ", data);

  if (info.status === "error") {
    return (
      <Div className={management["main-workspace-management-container"]}>
        <AuthHeader params={data} />

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
        <AuthHeader params={data} />
        <LongText className={management["workspace-data-error-text"]}>
          {info.message}
        </LongText>
        <AuthFooter />
      </Div>
    );
  }

  return (
    <Div className={management["main-workspace-management-container"]}>
      <AuthHeader params={data} />

      <Div className={management["heading-container"]}>
        <HeadingOne id="heading-one" className={management["heading-one"]}>
          Canvas Management
        </HeadingOne>
      </Div>
      <Dashboard params={data} />
      <AuthFooter />
    </Div>
  );
};

export default Page;
