"use client";
import React from "react";
import zoomControls from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/zoom-controls.module.scss";
import Div from "@/src/ui/Div";
import LongText from "@/src/ui/LongText";
import SVG from "@/src/SVG";

const ZoomControls = () => {
  return (
    <Div className={zoomControls["zoom-controls-container"]}>
      <Div className={zoomControls["zoom-controls"]}>
        <Div className={zoomControls["zoom-in-wrapper"]}>
          <SVG
            src="/zoom-in.svg"
            className={zoomControls["btn-zoom-in"]}
            alt="Component Hub Icon"
          />
        </Div>
        <Div className={zoomControls["zoom-out-wrapper"]}>
          <SVG
            src="/zoom-out.svg"
            className={zoomControls["btn-zoom-out"]}
            alt="Component Hub Icon"
          />
        </Div>
      </Div>
      <Div className={zoomControls["zoom-controls-text-wrapper"]}>
        <LongText className={zoomControls["zoom-controls-text"]}>
          Zoom controls
        </LongText>
      </Div>
    </Div>
  );
};

export default ZoomControls;
