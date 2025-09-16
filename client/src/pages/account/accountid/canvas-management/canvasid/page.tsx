import LongText from "../../../../../../src/ui/LongText";
import DynamicWorkspaceSheet from "./DynamicCanvasSheet";
import dynamicWorkspaceSheet from "../../../../../style-files/dynamicWorkspaceSheet.module.scss";
import AuthCanvasHeader from "./(header)/AuthCanvasHeader";
import AuthFooter from "../../../../../../auth/auth-partials/AuthFooter";
import Div from "../../../../../ui/Div";
import { useEffect } from "react";

const fetchWorkspaceData = async (
  accountid: string,
  // workspacename: string,
  workspaceid: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/canvas-management/${workspaceid}`
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
  useEffect(() => {
    document.title = "Canva Workspace | MindCanvas";
  }, []);

  const { accountid, workspaceid } = await params;
  const data = { accountid, workspaceid };
  console.log(data);

  const wsRes = await fetchWorkspaceData(
    String(accountid),
    // String(workspacename),
    String(workspaceid)
  );
  console.log(wsRes);

  if (wsRes.status === "error") {
    return (
      <Div
        className={dynamicWorkspaceSheet["main-workspace-management-container"]}
      >
        <AuthCanvasHeader />
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
        <AuthCanvasHeader />
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
