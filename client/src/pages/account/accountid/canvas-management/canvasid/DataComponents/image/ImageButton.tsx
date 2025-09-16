import Button from "../src/components/form-elements/Button";
import imageComp from "../app/style-files/comp-hub-data-components.module.scss";
import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";

export const ImageButton = () => {
  // Toggles Image state true or false to display or hide image component in DataContainer component.
  const { toggleImageState } = useWorkspaceContext();
  return (
    <Button
      id="image-comp"
      onClick={toggleImageState}
      className={imageComp["image-comp"]}
    >
      Image
    </Button>
  );
};
