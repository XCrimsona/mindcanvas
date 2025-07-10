import React from "react";
import Div from "@/src/ui/Div";
import SVG from "@/src/SVG";
import Button from "@/src/components/form-elements/Button";
import componentHub from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";
import { useComponentHubState } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/ComponentHubStateProvider";
import { TextButton } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextButton";
import { AudioButton } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/audio/AudioButton";
import { ImageButton } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/image/ImageButton";
import { VideoButton } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/video/VideoButton";
const ComponentHub = () => {
  const { sharedToggleState, toggleSharedState } = useComponentHubState();

  return (
    sharedToggleState && (
      <Div className={componentHub["comp-hub-data-components-container"]}>
        <Div
          className={componentHub["comp-hub-data-components-list-container"]}
        >
          <Button
            id="close-icon-wrapper"
            className={componentHub["close-icon-wrapper"]}
          >
            <SVG
              className={componentHub["close-icon"]}
              src="/close-icon.svg"
              alt="Close Icon"
              onClick={toggleSharedState}
            />
          </Button>

          <Div className={componentHub["comp-hub-data-components-list"]}>
            <TextButton />
            <AudioButton />
            <ImageButton />
            <VideoButton />
          </Div>
        </Div>
      </Div>
    )
  );
};

export default ComponentHub;
