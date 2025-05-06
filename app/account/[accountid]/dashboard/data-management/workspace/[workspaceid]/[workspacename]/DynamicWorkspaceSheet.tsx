"use client";
import React, { useState } from "react";
import Div from "@/src/ui/Div";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import LongText from "@/src/ui/LongText";
import AuthHeader from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(header)/AuthWorkspaceHeader";
import Button from "@/src/components/form-elements/Button";
import { InputDisabledText } from "@/src/components/form-elements/InputTypeInterfaces";
import SVG from "@/src/SVG";

const DynamicWorkspaceSheet = ({ params }: any) => {
  //Hides/Masks sensitive workspace data
  const maskSensitiveData = (text: string) => "*".repeat(text.length);

  //db button logic
  //refresh page to update workspace data
  const refresh = () => {
    alert("Refresh Logic");
    return;
  };

  //save all data to cloud db
  const save = () => {
    alert("Refresh Logic");
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
  const toggleSenstiveWorkspaceId = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggleWorkspaceIdEye(!toggleWorkspaceIdEye);
    setSecurityVisualToggleId(!securityVisualToggleId);
  };

  //Clipboard features
  const copyWorkspaceName = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Must copy Name to clipboard");
    return;
  };

  const copyWorkspaceId = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Must copy Id to clipboard");
    return;
  };

  //creates fixed selection but dynamic component
  const ComponentHub = () => {};
  return (
    <>
      <Div
        className={
          workspaceDataManagement["work-data-management-main-container"]
        }
      >
        <AuthHeader />

        {/* below has angular gradient */}
        <Div
          className={
            workspaceDataManagement["work-data-management-container-wrapper"]
          }
        >
          <Div
            className={
              workspaceDataManagement["work-data-management-container"]
            }
          >
            <Div
              className={
                workspaceDataManagement[
                  "primary-workspace-controls-and-workspace-details"
                ]
              }
            >
              <Div
                className={
                  workspaceDataManagement["primary-workspace-controls"]
                }
              >
                <Div
                  className={
                    workspaceDataManagement["refresh-workspace-btn-wrapper"]
                  }
                >
                  <Button
                    id="refresh-workspace-btn"
                    className={workspaceDataManagement["refresh-workspace-btn"]}
                    onClick={refresh}
                  >
                    REFRESH
                  </Button>
                </Div>
                <Div
                  className={
                    workspaceDataManagement["save-workspace-btn-wrapper"]
                  }
                >
                  <Button
                    id="save-workspacep-btn"
                    className={workspaceDataManagement["save-workspace-btn"]}
                    onClick={save}
                  >
                    SAVE
                  </Button>
                </Div>
              </Div>
              <Div className={workspaceDataManagement["workspace-details"]}>
                <Div
                  className={workspaceDataManagement["workspace-name-wrapper"]}
                >
                  <InputDisabledText
                    id=""
                    className={workspaceDataManagement["workspace-name"]}
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
                        ? "https://res.cloudinary.com/djjvj73xa/image/upload/v1746525549/eye-solid-white_gka3ki.svg"
                        : "https://res.cloudinary.com/djjvj73xa/image/upload/v1746527176/eye-slash-solid-white_yclegi.svg"
                    }
                    alt={
                      toggleWorkspaceNameEye
                        ? "Visible Eye icon"
                        : "Hidden Eye Icon"
                    }
                    onClick={toggleSenstiveWorkspaceName}
                    className={workspaceDataManagement["eye-icon"]}
                  />
                  <SVG
                    src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746435210/copy-solid-white_cf5vfl.svg"
                    alt="Clipboard icon"
                    onClick={copyWorkspaceName}
                    className={workspaceDataManagement["clipboard-icon"]}
                  />
                </Div>
                <Div
                  className={workspaceDataManagement["workspace-id-wrapper"]}
                >
                  <InputDisabledText
                    id=""
                    className={workspaceDataManagement["workspace-id"]}
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
                        ? "https://res.cloudinary.com/djjvj73xa/image/upload/v1746525549/eye-solid-white_gka3ki.svg"
                        : "https://res.cloudinary.com/djjvj73xa/image/upload/v1746527176/eye-slash-solid-white_yclegi.svg"
                    }
                    alt={
                      toggleWorkspaceIdEye
                        ? "Visible Eye icon"
                        : "Hidden Eye Icon"
                    }
                    onClick={toggleSenstiveWorkspaceId}
                    className={workspaceDataManagement["eye-icon"]}
                  />
                  <SVG
                    src="https://res.cloudinary.com/djjvj73xa/image/upload/v1746435210/copy-solid-white_cf5vfl.svg"
                    alt="Clipboard icon"
                    onClick={copyWorkspaceId}
                    className={workspaceDataManagement["clipboard-icon"]}
                  />
                </Div>
              </Div>
            </Div>

            <Div
              className={
                workspaceDataManagement["work-data-management-cluster"]
              }
            >
              <LongText
                className={
                  workspaceDataManagement[
                    "work-data-management-dummy-cluster-data"
                  ]
                }
              >
                Workspace with data component drag,drop,keyboard, and behind the
                scenes animation capabilities
              </LongText>
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default DynamicWorkspaceSheet;
