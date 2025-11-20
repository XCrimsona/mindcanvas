import "./help.css";
import { DivClass } from "../../../../../../ui/Div";
import SVG from "../../../../../../SVG";
import ShortText from "../../../../../../ui/ShortText";
const HelpButton = () => {
  return (
    <DivClass className={"help-container"}>
      <DivClass className={"help-btn-wrapper"}>
        <SVG
          className={"help-mark"}
          src="/question-mark-solid-white.svg"
          alt="Help Question Mark"
          // onClick={}
        />
      </DivClass>
      <DivClass className={"help-text-wrapper"}>
        <ShortText className={"help-text"}>Help</ShortText>
      </DivClass>
    </DivClass>
  );
};

export default HelpButton;
