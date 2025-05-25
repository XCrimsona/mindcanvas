import workspaceCoreFunctionalities from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/workspace-core-functionalities.module.scss";
import React from "react";
import ComponentHub from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/ComponentHub";
import Div from "@/src/ui/Div";
import ZoomControls from "./ZoomControls";
import HelpButton from "./help/HelpButton";
import WorkspaceSizeControls from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/WorkspaceSizeControls";
import ComponentHubButton from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/ComponentHubButton";
import { ComponentHubStateProvider } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/ComponentHubStateProvider";

const WorkspaceCoreFunctionality = ({ params }: { params: any }) => {
  return (
    <Div
      className={workspaceCoreFunctionalities["workspace-core-functionalities"]}
    >
      <ComponentHubStateProvider>
        <ComponentHubButton />
        <ComponentHub />
      </ComponentHubStateProvider>
      <ZoomControls />
      <HelpButton />
      <WorkspaceSizeControls params={params} />
    </Div>
  );
};

export default WorkspaceCoreFunctionality;
