import React, { useState } from "react";
import primaryControls from "../app/style-files/primary-controls.module.scss";
import Div from "../src/ui/Div";
import Button from "../src/components/form-elements/Button";
import { InputDisabledText } from "../src/components/form-elements/InputTypeInterfaces";
import SVG from "../src/SVG";
import { useMaskSensitiveData } from "../app/account/[accountid]/canvas-management/[canvasid]/MaskSensitiveData";
import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";
import { useCanvasDeletionContext } from "../app/account/[accountid]/canvas-management/[canvasid]/delete-data/CanvasDeletionOpsContext";

const PrimaryControlsAndDetails = ({ params }: any) => {
  try {
    const { canvasDeletionToggle } = useCanvasDeletionContext();

    //refresh content without reload
    const { updateCanvasData } = useCanvasContext();
    const refresh = async () => {
      updateCanvasData();
    };

    const { maskSensitiveData } = useMaskSensitiveData();

    //Clipboard features
    const copyCanvasName = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await window.navigator.clipboard.writeText(params.workspacename);
      alert("Copied to clipboard");
      return;
    };
    const copycanvasid = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await window.navigator.clipboard.writeText(params.canvasid);
      alert("Copied to clipboard");
      return;
    };

    //hides senstive data as default
    const [securityVisualToggleName, setSecurityVisualToggleName] =
      useState<boolean>(false);
    const [securityVisualToggleId, setSecurityVisualToggleId] =
      useState<boolean>(false);

    //Eye icon tells hidden or displayed data. Default is masked/hidden eye
    const [toggleCanvasNameEye, setToggleCanvasNameEye] =
      useState<boolean>(false);
    const [togglecanvasidEye, setTogglecanvasidEye] = useState<boolean>(false);

    //The complete sensitive data toggle features for events like screenshare data protetion
    const toggleSenstiveCanvasName = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      setToggleCanvasNameEye(!toggleCanvasNameEye);
      setSecurityVisualToggleName(!securityVisualToggleName);
    };
    const toggleSenstiveCanvasid = (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTogglecanvasidEye(!togglecanvasidEye);
      setSecurityVisualToggleId(!securityVisualToggleId);
    };

    return (
      <Div
        className={
          primaryControls["primary-workspace-controls-and-workspace-details"]
        }
      >
        <Div className={primaryControls["primary-workspace-controls"]}>
          <Div className={primaryControls["refresh-workspace-btn-wrapper"]}>
            <Button
              id="refresh-workspace-btn"
              className={primaryControls["refresh-workspace-btn"]}
              onClick={canvasDeletionToggle}
            >
              DELETE
            </Button>
          </Div>
          <Div className={primaryControls["refresh-workspace-btn-wrapper"]}>
            <Button
              id="refresh-workspace-btn"
              className={primaryControls["refresh-workspace-btn"]}
              onClick={refresh}
            >
              REFRESH
            </Button>
          </Div>
        </Div>
        <Div className={primaryControls["workspace-details"]}>
          <Div className={primaryControls["workspace-name-wrapper"]}>
            <InputDisabledText
              id="disabled-workspace-name"
              className={primaryControls["workspace-name"]}
              value={
                params.workspacename
                  ? `Name: ${
                      securityVisualToggleName
                        ? params.workspacename
                        : maskSensitiveData(params.workspacename)
                    }`
                  : "You need to login"
              }
            />
            <SVG
              src={
                toggleCanvasNameEye
                  ? "/eye-solid-white.svg"
                  : "/eye-slash-solid-white.svg"
              }
              alt={toggleCanvasNameEye ? "Visible Eye icon" : "Hidden Eye Icon"}
              onClick={toggleSenstiveCanvasName}
              className={primaryControls["eye-icon"]}
            />
            <SVG
              src="/copy-solid-white.svg"
              alt="Clipboard icon"
              onClick={copyCanvasName}
              className={primaryControls["clipboard-icon"]}
            />
          </Div>
          <Div className={primaryControls["workspace-id-wrapper"]}>
            <InputDisabledText
              id="disabled-workspace-id"
              className={primaryControls["workspace-id"]}
              value={
                params.canvasid
                  ? `Id: ${
                      securityVisualToggleId
                        ? params.canvasid
                        : maskSensitiveData(params.canvasid)
                    }`
                  : "You need to login"
              }
            />
            <SVG
              src={
                togglecanvasidEye
                  ? "/eye-solid-white.svg"
                  : "/eye-slash-solid-white.svg"
              }
              alt={togglecanvasidEye ? "Visible Eye icon" : "Hidden Eye Icon"}
              onClick={toggleSenstiveCanvasid}
              className={primaryControls["eye-icon"]}
            />
            <SVG
              src="/copy-solid-white.svg"
              alt="Clipboard icon"
              onClick={copycanvasid}
              className={primaryControls["clipboard-icon"]}
            />
          </Div>
        </Div>
      </Div>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default PrimaryControlsAndDetails;
