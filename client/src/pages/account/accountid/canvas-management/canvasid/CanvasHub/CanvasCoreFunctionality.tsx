import workspaceCoreFunctionalities from "../app/style-files/workspace-core-functionalities.module.scss";
import React from "react";
import ComponentHub from "../app/account/[accountid]/canvas-management/[canvasid]/CanvasHub/ComponentHub";
import Div from "../src/ui/Div";
import ZoomControls from "./ZoomControls";
import HelpButton from "./help/HelpButton";

import CanvasSizeControls from "../app/account/[accountid]/canvas-management/[canvasid]/CanvasHub/CanvasSizeControls";
import ComponentHubButton from "../app/account/[accountid]/canvas-management/[canvasid]/CanvasHub/ComponentHubButton";
import { ComponentHubProvider } from "../app/account/[accountid]/canvas-management/[canvasid]/ComponentHubContextProvider";

const CanvasCoreFunctionality = ({ params }: { params: any }) => {
  return (
    <Div
      className={workspaceCoreFunctionalities["workspace-core-functionalities"]}
    >
      <ComponentHubProvider>
        <ComponentHubButton />
        <ComponentHub />
      </ComponentHubProvider>
      <ZoomControls />
      <HelpButton />
      <CanvasSizeControls params={params} />
    </Div>
  );
};

export default CanvasCoreFunctionality;
