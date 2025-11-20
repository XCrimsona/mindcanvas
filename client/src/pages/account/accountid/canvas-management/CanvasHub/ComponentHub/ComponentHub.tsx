import { DivClass } from "../../../../../../ui/Div";
import SVG from "../../../../../../SVG";
import Button from "../../../../../../components/form-elements/Button";
import "../../CanvasHub/comp-hub-data-components.css";
import { useComponentHub } from "../ComponentHubContextProvider";
import { TextButton } from "../../DataComponents/text/TextButton";
// import { AudioButton } from "../DataComponents/audio/AudioButton";
import { ImageButton } from "../../DataComponents/image/ImageButton";
// import { VideoButton } from "../DataComponents/video/VideoButton";
const ComponentHub = () => {
  const { sharedToggleState, toggleSharedState } = useComponentHub();

  return (
    sharedToggleState && (
      <DivClass className={"comp-hub-data-components-container"}>
        <DivClass className={"comp-hub-data-components-list-container"}>
          <Button id="close-icon-wrapper" className={"close-icon-wrapper"}>
            <SVG
              className={"close-icon"}
              src="/close-icon.svg"
              alt="Close Icon"
              onClick={toggleSharedState}
            />
          </Button>

          <DivClass className={"comp-hub-data-components-list"}>
            <TextButton />
            {/* <AudioButton /> */}
            <ImageButton />
            {/* <VideoButton /> */}
          </DivClass>
        </DivClass>
      </DivClass>
    )
  );
};

export default ComponentHub;
