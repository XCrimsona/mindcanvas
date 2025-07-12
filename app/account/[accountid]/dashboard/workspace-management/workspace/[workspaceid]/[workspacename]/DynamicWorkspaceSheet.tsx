"use client";
import Div from "@/src/ui/Div";
import dynamicWorkspaceSheet from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/dynamicWorkspaceSheet.module.scss";
import AuthHeader from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/(header)/AuthWorkspaceHeader";
import DataContainer from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataContainer";
import PrimaryControlsAndDetails from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/PrimaryControlsAndDetails";
import WorkspaceCoreFunctionality from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/WorkspaceCoreFunctionality";
import { WorkspaceContextProvider } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import DeleteWorkspace from "./WorkspaceDeletion/DeleteWorkspace";
import { WorkspaceContextDeletionProvider } from "./WorkspaceDeletion/WorkspaceDeletionOpsContext";
// import { useRouter } from "next/navigation";
// import AuthFooter from "../../../../(auth-footer)/AuthFooter";
const DynamicWorkspaceSheet = ({ params }: any) => {
  try {
    return (
      <>
        <Div
          className={
            dynamicWorkspaceSheet["work-workspace-management-main-container"]
          }
        >
          <AuthHeader />
          <Div
            className={
              dynamicWorkspaceSheet[
                "work-workspace-management-container-wrapper"
              ]
            }
          >
            <WorkspaceContextDeletionProvider params={params}>
              <DeleteWorkspace />
              <Div
                className={
                  dynamicWorkspaceSheet["work-workspace-management-container"]
                }
              >
                <WorkspaceContextProvider params={params}>
                  <PrimaryControlsAndDetails params={params} />
                  <WorkspaceCoreFunctionality params={params} />
                  <DataContainer params={params} />
                </WorkspaceContextProvider>
              </Div>
            </WorkspaceContextDeletionProvider>
          </Div>
        </Div>
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default DynamicWorkspaceSheet;
