"use client";
import SVG from "@/src/SVG";
import Div from "@/src/ui/Div";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-workspace-management.module.scss";
import { useComponentHubState } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/ComponentHubStateProvider";

const ComponentHubStateToggle = () => {
  const { toggleSharedState } = useComponentHubState();
  return (
    <Div className={workspaceDataManagement["component-hub-btn-wrapper"]}>
      <SVG
        src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746546115/component-hub_sijuzu.svg"
        className={workspaceDataManagement["component-hub-btn"]}
        alt="Component Hub Icon"
        onClick={toggleSharedState}
      />
    </Div>
  );
};

export default ComponentHubStateToggle;
