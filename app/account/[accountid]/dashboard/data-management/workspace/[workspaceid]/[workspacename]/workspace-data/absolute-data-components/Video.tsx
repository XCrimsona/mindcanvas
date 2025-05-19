"use client";
import Div from "@/src/ui/Div";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import LongText from "@/src/ui/LongText";

const Video = ({ data }: any) => {
  return (
    <Div
      className={workspaceDataManagement["video-component"]}
      key={data._id}
      onStyle={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <Div className={workspaceDataManagement["video-info"]}>
        <LongText className={workspaceDataManagement["video-name"]}>
          {data.name}
        </LongText>
        <video id="video" className={workspaceDataManagement["video"]} />
      </Div>
    </Div>
  );
};

export default Video;
