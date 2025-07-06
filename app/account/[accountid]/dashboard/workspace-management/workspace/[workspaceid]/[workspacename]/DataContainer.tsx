"use client";
import Div from "@/src/ui/Div";
import React from "react";
import dataContainer from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/data-container.module.scss";
import TextInputUnit from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextInputUnit";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import WorkspaceData from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/WorkspaceData";
import AudioInputUnit from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/audio/AudioInputUnit";
import ImageInputUnit from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/image/ImageInputUnit";
import VideoInputUnit from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/video/VideoInputUnit";

const DataContainer = ({ params }: any) => {
  // const { textComponentDisplayState } = useTextComponentDisplayState();

  const { dataScrollBoardRef, workspaceHeight, workspaceWidth } =
    useWorkspaceContext();

  return (
    <Div className={dataContainer["data-container"]}>
      <Div
        className={dataContainer["data-scroll-board"]}
        //dataScrollBoardRef as windowRef
        ref={dataScrollBoardRef}
        onStyle={{
          width: `${workspaceWidth}px`,
          height: `${workspaceHeight}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Below InputUnits used for multi media submits */}
        <TextInputUnit params={params} />
        <AudioInputUnit params={params} />
        <ImageInputUnit params={params} />
        <VideoInputUnit params={params} />

        {/* display cloud data below */}
        <WorkspaceData />
      </Div>
    </Div>
  );
};

export default DataContainer;
