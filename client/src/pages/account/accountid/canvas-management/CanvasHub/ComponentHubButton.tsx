import "./component-hub-container.css";
import { DivClass } from "../../../../../ui/Div";
import SVG from "../../../../../SVG";
import { LongText } from "../../../../../ui/LongText";
import { useComponentHub } from "./ComponentHubContextProvider";

const ComponentHubButton = () => {
  const { toggleSharedState } = useComponentHub();
  return (
    <DivClass className={"component-hub-container"}>
      <DivClass className={"component-hub-btn-wrapper"}>
        <SVG
          src="/component-hub.svg"
          className={"component-hub-btn"}
          alt="Component Hub Icon"
          onClick={toggleSharedState}
        />
      </DivClass>
      <DivClass className={"component-hub-text-wrapper"}>
        <LongText className={"longtext"}>Component Hub</LongText>
      </DivClass>
    </DivClass>
  );
};

export default ComponentHubButton;
