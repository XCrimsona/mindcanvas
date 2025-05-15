"use client";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import Div from "@/src/ui/Div";
import LongText from "@/src/ui/LongText";
import SVG from "@/src/SVG";

const ZoomControls = () => {
  return (
    <Div className={workspaceDataManagement["zoom-controls-container"]}>
      <Div className={workspaceDataManagement["zoom-controls"]}>
        <Div className={workspaceDataManagement["zoom-in-wrapper"]}>
          <SVG
            src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746546631/zoom_in_etq0i2.svg"
            className={workspaceDataManagement["btn-zoom-in"]}
            alt="Component Hub Icon"
          />
        </Div>
        <Div className={workspaceDataManagement["zoom-out-wrapper"]}>
          <SVG
            src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746546631/zoom_out_y1c8zq.svg"
            className={workspaceDataManagement["btn-zoom-out"]}
            alt="Component Hub Icon"
          />
        </Div>
      </Div>
      <Div className={workspaceDataManagement["zoom-controls-text-wrapper"]}>
        <LongText className={workspaceDataManagement["zoom-controls-text"]}>
          Zoom controls
        </LongText>
      </Div>
    </Div>
  );
};

export default ZoomControls;
