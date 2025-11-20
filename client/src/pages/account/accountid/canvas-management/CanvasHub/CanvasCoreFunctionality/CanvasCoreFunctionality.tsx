import ComponentHub from "../ComponentHub/ComponentHub";
import { DivClass } from "../../../../../../ui/Div";
// import ZoomControls from "./ZoomControls";
import HelpButton from "../help/HelpButton";
import "./canva-core-functionalities.css";
import CanvasSizeControls from "../CanvasSizeControls/CanvasSizeControls";
import ComponentHubButton from "../ComponentHubButton";
import { ComponentHubProvider } from "../ComponentHubContextProvider";

const CanvasCoreFunctionality = () => {
  return (
    <DivClass className={"workspace-core-functionalities"}>
      <DivClass className="binder">
        <ComponentHubProvider>
          <ComponentHubButton />
          <ComponentHub />
        </ComponentHubProvider>
        <HelpButton />
      </DivClass>
      <CanvasSizeControls />
    </DivClass>
  );
};

export default CanvasCoreFunctionality;
