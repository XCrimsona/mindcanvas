import Button from "../src/components/form-elements/Button";
import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";
import textComp from "../app/style-files/comp-hub-data-components.module.scss";
export const TextButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleTextState } = useWorkspaceContext();
  return (
    <Button
      id="text-comp"
      onClick={toggleTextState}
      className={textComp["text-comp"]}
    >
      Text
    </Button>
  );
};
