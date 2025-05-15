"use client";

import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import React from "react";
// import { useCompHubDisplayState } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/ComponentHubDisplayState";
import ComponentHub from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/ComponentHub";
import Div from "@/src/ui/Div";
import ZoomControls from "./(ComponentHubJSXStructure)/ZoomControls";
import HelpButton from "./(ComponentHubJSXStructure)/HelpButton";
import WorkspaceSizeControls from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/WorkspaceSizeControls";
import ComponentHubButton from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/ComponentHubButton";
import { SharedUseStateProvider } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/SharedStateProvider";

const WorkspaceCoreFunctionality = () => {
  //toggle data comp hub UI visibility
  // const { compHubDisplayState } = useCompHubDisplayState();

  return (
    <Div className={workspaceDataManagement["workspace-core-functionalities"]}>
      <SharedUseStateProvider>
        <ComponentHubButton />
        <ComponentHub />
      </SharedUseStateProvider>
      <ZoomControls />
      <HelpButton />

      <WorkspaceSizeControls />
    </Div>
  );
};

export default WorkspaceCoreFunctionality;
