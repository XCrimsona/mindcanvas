"use client";
import Div from "@/src/ui/Div";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import LongText from "@/src/ui/LongText";

const Audio = ({ data }: any) => {
  return (
    <Div className={workspaceDataManagement["audio-info"]}>
      <LongText className={workspaceDataManagement["audio-name"]}>
        {data.name}
      </LongText>
      <audio className={workspaceDataManagement["audio"]} translate={"yes"} />
    </Div>
    // </Div>
  );
};

export default Audio;
