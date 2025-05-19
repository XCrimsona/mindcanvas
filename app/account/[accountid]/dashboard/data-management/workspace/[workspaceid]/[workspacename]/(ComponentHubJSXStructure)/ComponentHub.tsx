"use client";
import React from "react";
import Div from "@/src/ui/Div";
import SVG from "@/src/SVG";
import Button from "@/src/components/form-elements/Button";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import { TextContextProvider } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextContextProvider";

import { useComponentHubState } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/SharedStateProvider";
import { TextButton } from "../DataComponents/text/TextButton";
const ComponentHub = () => {
  const { sharedToggleState, toggleSharedState } = useComponentHubState();
  // const { sharedAudioState, setSharedAudioState } = useSharedAudioState();
  // const { sharedImageState, setSharedImageState } = useSharedImageState();
  // const { sharedVideoState, setSharedVideoState } = useSharedVideoState();
  console.log("component hub sharedToggleState: ", sharedToggleState);

  return (
    sharedToggleState && (
      <Div
        className={
          workspaceDataManagement["comp-hub-data-components-container"]
        }
      >
        <Div
          className={
            workspaceDataManagement["comp-hub-data-components-list-container"]
          }
        >
          <Button
            id="close-icon-wrapper"
            className={workspaceDataManagement["close-icon-wrapper"]}
          >
            <SVG
              className={workspaceDataManagement["close-icon"]}
              src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746739182/close_icon_oos3ju.svg"
              alt="Close Icon"
              onClick={toggleSharedState}
            />
          </Button>

          <Div
            className={workspaceDataManagement["comp-hub-data-components-list"]}
          >
            <TextButton />
            <Button
              id="audio-comp"
              // onClick={}
              className={workspaceDataManagement["audio-comp"]}
            >
              Audio
            </Button>
            <Button
              id="image-comp"
              // onClick={}
              className={workspaceDataManagement["image-comp"]}
            >
              Image
            </Button>
            <Button
              id="video-comp"
              // onClick={}
              className={workspaceDataManagement["video-comp"]}
            >
              Video
            </Button>
          </Div>
        </Div>
      </Div>
    )
  );
};

export default ComponentHub;
