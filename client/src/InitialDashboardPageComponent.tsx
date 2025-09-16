import { DivClass } from "./ui/Div";
import DataManagement from "./DataManagement";
import HeadingOne from "./ui/HeadingOne";
import AuthHeader from "../../auth/auth-partials/AuthHeader";
import "../src/style-files/management.css";
import AuthFooter from "../../auth/auth-partials/AuthFooter";
import LongText from "./ui/LongText";
import { useEffect } from "react";

const fetchSheetData = async (accountid: string) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/canvas-management`
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

const InitialDashboardPageComponent = async ({ params }: any) => {
  useEffect(() => {
    document.title = "Canva Management | MindCanvas";
  });
  const { accountid } = await params;
  const info = await fetchSheetData(String(accountid));
  const data = {
    info,
    accountid,
  };

  if (info.status === "error") {
    return (
      <DivClass className={"main-workspace-management-container"}>
        <AuthHeader params={data} />

        <LongText className={"workspace-data-error-text"}>
          {info.message}
        </LongText>

        <AuthFooter />
      </DivClass>
    );
  }

  if (info.status === "empty") {
    return (
      <DivClass className={"main-workspace-management-container"}>
        <AuthHeader params={data} />

        <LongText className={"workspace-data-error-text"}>
          {info.message}
        </LongText>
        <AuthFooter />
      </DivClass>
    );
  }

  return (
    <DivClass className={"main-workspace-management-container"}>
      <AuthHeader params={data} />
      <DivClass className={"heading-container"}>
        <HeadingOne id="heading-one" className={"heading-one"}>
          Canvas Management
        </HeadingOne>
      </DivClass>
      <DataManagement params={data} />
      <AuthFooter />
    </DivClass>
  );
};

export default InitialDashboardPageComponent;
