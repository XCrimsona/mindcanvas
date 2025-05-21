"use client";

import workspaceCoreFunctionalities from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/workspace-core-functionalities.module.scss";
import React from "react";
// import { useCompHubDisplayState } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/ComponentHubDisplayState";
import ComponentHub from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/ComponentHub";
import Div from "@/src/ui/Div";
import ZoomControls from "./ZoomControls";
import HelpButton from "./HelpButton";
import WorkspaceSizeControls from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/WorkspaceSizeControls";
import ComponentHubButton from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/ComponentHubButton";
import { ComponentHubStateProvider } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/ComponentHubStateProvider";

const WorkspaceCoreFunctionality = () => {
  //toggle data comp hub UI visibility
  // const { compHubDisplayState } = useCompHubDisplayState();

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
      <WorkspaceSizeControls />
    </Div>
  );
};

export default WorkspaceCoreFunctionality;
