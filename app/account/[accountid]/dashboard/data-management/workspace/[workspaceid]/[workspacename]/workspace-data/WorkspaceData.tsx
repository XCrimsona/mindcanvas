"use client";
import React from "react";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";
import Text from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Text";
import Audio from "./absolute-data-components/Audio";
import Image from "./absolute-data-components/Image";
import Video from "./absolute-data-components/Video";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import Div from "@/src/ui/Div";

const WorkspaceData = () => {
  //updateWorkspaceData
  const { workspaceData } = useWorkspaceContext();

  return (
    workspaceData &&
    workspaceData.map((data: any) => {
      const renderDataByComponentType = (data: any) => {
        switch (data.type) {
          case "text":
            return <Text data={data} />;
          case "list":
            return <Text data={data} />;
          case "audio":
            return <Audio data={data} />;
          case "image":
            return <Image data={data} />;
          case "video":
            return <Video data={data} />;
          default:
            return <p>Unsupported Type</p>;
        }
      };
      return (
        <Div
          className={workspaceDataManagement["data-component"]}
          key={data._id}
          onStyle={{
            position: "absolute",
            left: 0,
            top: 0,
            color: "#fff",
            transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
          }}
        >
          {renderDataByComponentType(data)}
        </Div>
      );
    })
  );
};

export default WorkspaceData;
