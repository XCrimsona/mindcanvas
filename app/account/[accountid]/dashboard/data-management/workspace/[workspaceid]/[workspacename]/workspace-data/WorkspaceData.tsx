"use client";
import React from "react";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";
import { ImmutableText } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Text";
import { ImmutableList } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/List";
import { ImmutableAudio } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Audio";
import { ImmutableImage } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Image";
import { ImmutableVideo } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Video";
import Div from "@/src/ui/Div";
import ShortText from "@/src/ui/ShortText";

const WorkspaceData = () => {
  //Display all workspace data including text, list, audio, image, video once submitted
  const { workspaceData } = useWorkspaceContext();

  return (
    workspaceData &&
    workspaceData.map((data: any) => {
      const renderDataByComponentType = (data: any) => {
        switch (data.type) {
          case "text":
            return <ImmutableText data={data} />;
          case "list":
            return <ImmutableList data={data} />;
          case "audio":
            return <ImmutableAudio data={data} />;
          case "image":
            return <ImmutableImage data={data} />;
          case "video":
            return <ImmutableVideo data={data} />;
          default:
            return (
              <ShortText className={"unsupported-type-text"}>
                Unsupported Type
              </ShortText>
            );
        }
      };
      return (
        <Div
          className={"data-component"}
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
