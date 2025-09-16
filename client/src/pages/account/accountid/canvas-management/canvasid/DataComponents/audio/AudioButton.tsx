import Button from "../src/components/form-elements/Button";
import audioComp from "../app/style-files/comp-hub-data-components.module.scss";

import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";

export const AudioButton = () => {
  //Toggles Audio state true or false to display or hide audio component in DataContainer component.
  const { toggleAudioState } = useWorkspaceContext();
  return (
    <Button
      id="audio-comp"
      onClick={toggleAudioState}
      className={audioComp["audio-comp"]}
    >
      Audio
    </Button>
  );
};
