import React from "react";
import help from "../app/style-files/help.module.scss";
import Div from "../src/ui/Div";
import SVG from "../src/SVG";
import ShortText from "../src/ui/ShortText";
const HelpButton = () => {
  return (
    <Div className={help["help-container"]}>
      <Div className={help["help-btn-wrapper"]}>
        <SVG
          className={help["help-mark"]}
          src="/question-mark-solid-white.svg"
          alt="Help Question Mark"
          // onClick={}
        />
      </Div>
      <Div className={help["help-text-wrapper"]}>
        <ShortText className={help["help-text"]}>Help</ShortText>
      </Div>
    </Div>
  );
};

export default HelpButton;
