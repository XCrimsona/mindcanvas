"use client";
import React, { useState } from "react";
import primaryControls from "@/app/style-files/primary-controls.module.scss";
import Div from "@/src/ui/Div";
import Button from "@/src/components/form-elements/Button";
import { InputDisabledText } from "@/src/components/form-elements/InputTypeInterfaces";
import SVG from "@/src/SVG";
import { useMaskSensitiveData } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/MaskSensitiveData";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import { useWorkspaceDeletionContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/WorkspaceDeletion/WorkspaceDeletionOpsContext";

const PrimaryControlsAndDetails = ({ params }: any) => {
  try {
    const { workspaceDeletionToggle } = useWorkspaceDeletionContext();

    //refresh content without reload
    const { updateWorkspaceData } = useWorkspaceContext();
    const refresh = async () => {
      updateWorkspaceData();
    };

    const { maskSensitiveData } = useMaskSensitiveData();

    //Clipboard features
    const copyWorkspaceName = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await window.navigator.clipboard.writeText(params.workspacename);
      alert("Copied to clipboard");
      return;
    };
    const copyWorkspaceId = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await window.navigator.clipboard.writeText(params.workspaceid);
      alert("Copied to clipboard");
      return;
    };

    //hides senstive data as default
    const [securityVisualToggleName, setSecurityVisualToggleName] =
      useState<boolean>(false);
    const [securityVisualToggleId, setSecurityVisualToggleId] =
      useState<boolean>(false);

    //Eye icon tells hidden or displayed data. Default is masked/hidden eye
    const [toggleWorkspaceNameEye, setToggleWorkspaceNameEye] =
      useState<boolean>(false);
    const [toggleWorkspaceIdEye, setToggleWorkspaceIdEye] =
      useState<boolean>(false);

    //The complete sensitive data toggle features for events like screenshare data protetion
    const toggleSenstiveWorkspaceName = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      setToggleWorkspaceNameEye(!toggleWorkspaceNameEye);
      setSecurityVisualToggleName(!securityVisualToggleName);
    };
    const toggleSenstiveWorkspaceId = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      setToggleWorkspaceIdEye(!toggleWorkspaceIdEye);
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
              onClick={workspaceDeletionToggle}
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
                toggleWorkspaceNameEye
                  ? "/eye-solid-white.svg"
                  : "/eye-slash-solid-white.svg"
              }
              alt={
                toggleWorkspaceNameEye ? "Visible Eye icon" : "Hidden Eye Icon"
              }
              onClick={toggleSenstiveWorkspaceName}
              className={primaryControls["eye-icon"]}
            />
            <SVG
              src="/copy-solid-white.svg"
              alt="Clipboard icon"
              onClick={copyWorkspaceName}
              className={primaryControls["clipboard-icon"]}
            />
          </Div>
          <Div className={primaryControls["workspace-id-wrapper"]}>
            <InputDisabledText
              id="disabled-workspace-id"
              className={primaryControls["workspace-id"]}
              value={
                params.workspaceid
                  ? `Id: ${
                      securityVisualToggleId
                        ? params.workspaceid
                        : maskSensitiveData(params.workspaceid)
                    }`
                  : "You need to login"
              }
            />
            <SVG
              src={
                toggleWorkspaceIdEye
                  ? "/eye-solid-white.svg"
                  : "/eye-slash-solid-white.svg"
              }
              alt={
                toggleWorkspaceIdEye ? "Visible Eye icon" : "Hidden Eye Icon"
              }
              onClick={toggleSenstiveWorkspaceId}
              className={primaryControls["eye-icon"]}
            />
            <SVG
              src="/copy-solid-white.svg"
              alt="Clipboard icon"
              onClick={copyWorkspaceId}
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
