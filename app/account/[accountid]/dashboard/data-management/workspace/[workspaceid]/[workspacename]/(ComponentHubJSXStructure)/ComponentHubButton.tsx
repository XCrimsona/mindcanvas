"use client";
import React, { useState } from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import Div from "@/src/ui/Div";
import SVG from "@/src/SVG";
// import { compHubDataElementMouseDownEvent } from "../DataComponents/MouseEvents";
import LongText from "@/src/ui/LongText";
import { useSharedUseState } from "../SharedStateProvider";
// import { useCompHubDisplayState } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/ComponentHubDisplayState";

const ComponentHubButton = () => {
  const { toggleSharedState } = useSharedUseState();
  return (
    <Div className={workspaceDataManagement["component-hub-container"]}>
      <Div className={workspaceDataManagement["component-hub-btn-wrapper"]}>
        <SVG
          src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746546115/component-hub_sijuzu.svg"
          className={workspaceDataManagement["component-hub-btn"]}
          alt="Component Hub Icon"
          onClick={toggleSharedState}
        />
      </Div>
      <Div className={workspaceDataManagement["component-hub-text-wrapper"]}>
        <LongText className={workspaceDataManagement["longtext"]}>
          Component Hub
        </LongText>
      </Div>
    </Div>
  );
};

export default ComponentHubButton;
{
  /* pull component data from db - 14 may this comment doesnt belong here needs to go */
}
{
  /* // onMouseUp={} */
}
{
  /* // compHubDataElementMouseDownEvent("event", "id") */
}
