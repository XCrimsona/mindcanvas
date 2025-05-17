"use client";
import Div from "@/src/ui/Div";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import AuthHeader from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(header)/AuthWorkspaceHeader";
import DataContainer from "./DataContainer";
import PrimaryControlsAndDetails from "./(ComponentHubJSXStructure)/PrimaryControlsAndDetails";
import WorkspaceCoreFunctionality from "./WorkspaceCoreFunctionality";
import { WorkspaceSizeContextProvider } from "./DataComponents/WorkspaceControlsProvider/WorkspaceSizeContextProvider";

const DynamicWorkspaceSheet = ({ params }: any) => {
  try {
    return (
      <>
        <Div
          className={
            workspaceDataManagement["work-data-management-main-container"]
          }
        >
          <AuthHeader />
          {/* below has angular gradient */}
          <Div
            className={
              workspaceDataManagement["work-data-management-container-wrapper"]
            }
          >
            <Div
              className={
                workspaceDataManagement["work-data-management-container"]
              }
            >
              <PrimaryControlsAndDetails params={params} />
              <WorkspaceSizeContextProvider>
                <DataContainer params={params} />
                <WorkspaceCoreFunctionality />
              </WorkspaceSizeContextProvider>
            </Div>
          </Div>
        </Div>
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default DynamicWorkspaceSheet;
