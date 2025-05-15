"use client";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import Div from "@/src/ui/Div";
import SVG from "@/src/SVG";
import ShortText from "@/src/ui/ShortText";

const HelpButton = () => {
  return (
    <Div className={workspaceDataManagement["help-container"]}>
      <Div className={workspaceDataManagement["help-btn-wrapper"]}>
        <SVG
          className={workspaceDataManagement["help-mark"]}
          src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746698405/question-mark-solid-white_zqjxbt.png"
          alt="Help Question Mark"
          // onClick={}
        />
      </Div>
      <Div className={workspaceDataManagement["help-text-wrapper"]}>
        <ShortText className={workspaceDataManagement["help-text"]}>
          Help
        </ShortText>
      </Div>
    </Div>
  );
};

export default HelpButton;
