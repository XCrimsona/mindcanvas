"use client";
import React from "react";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import { ImmutableText } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Text";
// import { ImmutableList } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/List";
// import { ImmutableAudio } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Audio";
// import { ImmutableImage } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Image";
// import { ImmutableVideo } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/Video";
import Div from "@/src/ui/Div";
import ShortText from "@/src/ui/ShortText";

const WorkspaceData = () => {
  // Display all workspace data including text, list, audio, image, video once submitted
  const { workspaceData } = useWorkspaceContext();
  // console.log("workspaceData: ", workspaceData.workspaceData);

  const result =
    workspaceData &&
    workspaceData.workspaceData?.texts.map((data: any) => {
      const renderDataByComponentType = (data: any) => {
        switch (data.type) {
          case "Text":
            return <ImmutableText data={data} />;
          // case "List":
          //   return <ImmutableList data={data} />;
          // case "audio":
          //   return <ImmutableAudio data={data} />;
          // case "image":
          //   return <ImmutableImage data={data} />;
          // case "video":
          //   return <ImmutableVideo data={data} />;
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
    });
  const noWorkspaceData = workspaceData.code === "NO_EXISTING_DATA" && (
    <p>{workspaceData.message}</p>
  );
  return <div> {workspaceData.length === 0 ? noWorkspaceData : result}</div>;
};

export default WorkspaceData;
