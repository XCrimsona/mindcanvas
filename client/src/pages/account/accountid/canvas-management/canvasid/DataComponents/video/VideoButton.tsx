import Button from "../src/components/form-elements/Button";
import videoComp from "../app/style-files/comp-hub-data-components.module.scss";
import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";

export const VideoButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleVideoState } = useCanvasContext();
  return (
    <Button
      id="video-comp"
      onClick={toggleVideoState}
      className={videoComp["video-comp"]}
    >
      Video
    </Button>
  );
};
