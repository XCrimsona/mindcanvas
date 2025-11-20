import SVG from "../../../../../../SVG";
import { DivClass } from "../../../../../../ui/Div";
import "./component-hub-container.css";
import { useComponentHub } from "../ComponentHubContextProvider";

const ComponentHubToggler = () => {
  const { toggleSharedState } = useComponentHub();
  return (
    <DivClass className={"component-hub-btn-wrapper"}>
      <SVG
        src="/component-hub.svg"
        className={"component-hub-btn"}
        alt="Component Hub Icon"
        onClick={toggleSharedState}
      />
    </DivClass>
  );
};

export default ComponentHubToggler;
