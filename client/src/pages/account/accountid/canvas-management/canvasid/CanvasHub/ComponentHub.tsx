import React from "react";
import Div from "../src/ui/Div";
import SVG from "../src/SVG";
import Button from "../src/components/form-elements/Button";
import componentHub from "../app/style-files/comp-hub-data-components.module.scss";
import { useComponentHub } from "../app/account/[accountid]/canvas-management/[canvasid]/ComponentHubContextProvider";
import { TextButton } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/text/TextButton";
import { AudioButton } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/audio/AudioButton";
import { ImageButton } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/image/ImageButton";
import { VideoButton } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/video/VideoButton";
const ComponentHub = () => {
  const { sharedToggleState, toggleSharedState } = useComponentHub();

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
