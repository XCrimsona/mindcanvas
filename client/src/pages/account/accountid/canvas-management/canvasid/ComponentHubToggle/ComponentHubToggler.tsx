import SVG from "../src/SVG";
import Div from "../src/ui/Div";
import React from "react";
import workspaceDataManagement from "../app/style-files/workspace-workspace-management.module.scss";
import { useComponentHub } from "../app/account/[accountid]/canvas-management/[canvasid]/ComponentHubContextProvider";

const ComponentHubToggler = () => {
  const { toggleSharedState } = useComponentHub();
  return (
    <Div className={workspaceDataManagement["component-hub-btn-wrapper"]}>
      <SVG
        src="/component-hub.svg"
        className={workspaceDataManagement["component-hub-btn"]}
        alt="Component Hub Icon"
        onClick={toggleSharedState}
      />
    </Div>
  );
};

export default ComponentHubToggler;
