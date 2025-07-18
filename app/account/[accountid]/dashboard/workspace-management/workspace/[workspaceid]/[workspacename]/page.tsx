import LongText from "@/src/ui/LongText";
import DynamicWorkspaceSheet from "./DynamicWorkspaceSheet";
import dynamicWorkspaceSheet from "@/app/style-files/dynamicWorkspaceSheet.module.scss";
import AuthHeader from "./(header)/AuthWorkspaceHeader";
import AuthFooter from "../../../../(auth-footer)/AuthFooter";
import Div from "@/src/ui/Div";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canva Workspace | MindCanvas",
};

const fetchWorkspaceData = async (
  accountid: string,
  workspacename: string,
  workspaceid: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/workspace-management/workspace/${workspaceid}/${workspacename}`
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
  const { accountid, workspacename, workspaceid } = await params;
  const data = { accountid, workspacename, workspaceid };

  const wsRes = await fetchWorkspaceData(
    String(accountid),
    String(workspacename),
    String(workspaceid)
  );
  if (wsRes.status === "error") {
    return (
      <Div
        className={dynamicWorkspaceSheet["main-workspace-management-container"]}
      >
        <AuthHeader />
        <LongText
          className={dynamicWorkspaceSheet["workspace-data-error-text"]}
        >
          {wsRes.message}
        </LongText>
        <AuthFooter />
      </Div>
    );
  }
  if (wsRes.status === "empty") {
    return (
      <Div
        className={dynamicWorkspaceSheet["main-workspace-management-container"]}
      >
        <AuthHeader />
        <LongText
          className={dynamicWorkspaceSheet["workspace-data-error-text"]}
        >
          {wsRes.message}
        </LongText>
        <AuthFooter />
      </Div>
    );
  }

  return <DynamicWorkspaceSheet params={data} />;
};

export default Page;
