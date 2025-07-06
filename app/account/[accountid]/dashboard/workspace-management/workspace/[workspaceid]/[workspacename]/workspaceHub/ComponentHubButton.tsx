import React from "react";
import componentHubContainer from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/component-hub-container.module.scss";
import Div from "@/src/ui/Div";
import SVG from "@/src/SVG";
import LongText from "@/src/ui/LongText";
import { useComponentHubState } from "../ComponentHubStateProvider";

const ComponentHubButton = () => {
  const { toggleSharedState } = useComponentHubState();
  return (
    <Div className={componentHubContainer["component-hub-container"]}>
      <Div className={componentHubContainer["component-hub-btn-wrapper"]}>
        <SVG
          src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746546115/component-hub_sijuzu.svg"
          className={componentHubContainer["component-hub-btn"]}
          alt="Component Hub Icon"
          onClick={toggleSharedState}
        />
      </Div>
      <Div className={componentHubContainer["component-hub-text-wrapper"]}>
        <LongText className={componentHubContainer["longtext"]}>
          Component Hub
        </LongText>
      </Div>
    </Div>
  );
};

export default ComponentHubButton;
