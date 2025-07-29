"use client";
import Div from "@/src/ui/Div";
import dynamicWorkspaceSheet from "@/app/style-files/dynamicWorkspaceSheet.module.scss";
import AuthHeader from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/(header)/AuthWorkspaceHeader";
import DataContainer from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataContainer";
import { WorkspaceContextProvider } from "./DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import { InfoModificationContextProvider } from "./workspace-data/InfoModificationContextProvider";
import WorkspaceCoreFunctionality from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/WorkspaceCoreFunctionality";
import { WorkspaceContextDeletionProvider } from "./edit-data/WorkspaceDeletionOpsContext";
import DeleteWorkspace from "./WorkspaceDeletion/DeleteWorkspace";
import PrimaryControlsAndDetails from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/PrimaryControlsAndDetails";
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
            <WorkspaceContextProvider params={params}>
              <InfoModificationContextProvider>
                <WorkspaceContextDeletionProvider params={params}>
                  <DeleteWorkspace params={params} />
                  <Div
                    className={
                      dynamicWorkspaceSheet[
                        "work-workspace-management-container"
                      ]
                    }
                  >
                    <PrimaryControlsAndDetails params={params} />
                    <WorkspaceCoreFunctionality params={params} />
                    <DataContainer params={params} />
                  </Div>
                </WorkspaceContextDeletionProvider>
              </InfoModificationContextProvider>
            </WorkspaceContextProvider>
          </Div>
        </Div>
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default DynamicWorkspaceSheet;
