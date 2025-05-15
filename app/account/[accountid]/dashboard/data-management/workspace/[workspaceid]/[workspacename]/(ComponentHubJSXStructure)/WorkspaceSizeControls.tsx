import {
  InputDisabledText,
  InputEnabledText,
  InputSubmit,
} from "@/src/components/form-elements/InputTypeInterfaces";
import Div from "@/src/ui/Div";
import React, { useState } from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import LongText from "@/src/ui/LongText";
import { useWorkspaceHeight } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/WorkspaceHeight";
import { useWorkspaceWidth } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/WorkspaceWidth";
import { useWorkspaceProperties } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(ComponentHubJSXStructure)/WorkspaceProperties";

//Dynamic workspace width and height
const WorkspaceSizeControls = () => {
  try {
    const { workspaceHeight, setWorkspaceHeight } = useWorkspaceHeight();
    const { workspaceWidth, setWorkspaceWidth } = useWorkspaceWidth();
    const { workspaceProperties, setWorkspaceProperties } =
      useWorkspaceProperties();
    //update height and width for entire workspace
    const updateWorkspaceSizeProperties = async (
      e: React.FormEvent<HTMLInputElement>
    ) => {
      e.preventDefault();
      const workspaceSizeData: any = {};
      if (workspaceHeight) workspaceSizeData.height = workspaceHeight;
      if (workspaceWidth) workspaceSizeData.width = workspaceWidth;
      if (!workspaceSizeData.height || !workspaceSizeData.width) {
        alert("Please fill the workspace size property fields!");
        return;
      } else {
        // const text = await fetch(
        //   `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
        //   {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(workspaceSizeData),
        //   }
        // );
        //   if (text.ok) {
        //     //notification ok response
        //     alert("Your text data has been saved!");
        //   } else {
        //     //notification failed response
        //     alert("Failed to save your text data!");
        //   }
        // }
        console.log("demo ok");
      }
    };
    return (
      <form
        className={workspaceDataManagement["workspace-size-controls"]}
        onSubmit={() => {
          //save width and height to db
          //use comm notification lib to communicate
        }}
      >
        {/* make height and width editable and immutable */}
        <Div className={workspaceDataManagement["height-container"]}>
          {workspaceProperties ? (
            <InputEnabledText
              id="mutable-height"
              className={workspaceDataManagement["mutable-height"]}
              value={workspaceHeight ? workspaceHeight : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWorkspaceHeight(e.target.value);
              }}
              placeholder="Update height"
            />
          ) : (
            <InputDisabledText
              id="immutable-height"
              className={workspaceDataManagement["immutable-height"]}
              value={workspaceHeight ? "Workspace height" : "No DB height"}
            />
          )}
        </Div>
        <Div className={workspaceDataManagement["width-container"]}>
          {workspaceProperties ? (
            <InputEnabledText
              id=""
              className={workspaceDataManagement["mutable-width"]}
              value={workspaceWidth ? workspaceWidth : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWorkspaceWidth(e.target.value);
              }}
              placeholder="Update width"
            />
          ) : (
            <InputDisabledText
              id=""
              className={workspaceDataManagement["immutable-width"]}
              value={workspaceWidth ? "Workspace width" : "No DB width"}
            />
          )}
        </Div>
        <Div className={workspaceDataManagement["toggle-visual-ops-wrapper"]}>
          <div
            id="toggle-visual-ops"
            className={workspaceDataManagement["toggle-visual-ops"]}
            onClick={(e) => {
              e.preventDefault();
              setWorkspaceProperties(!workspaceProperties);
            }}
          >
            {workspaceProperties ? "View Properies" : "Edit Properies"}
          </div>
        </Div>
        <Div className={workspaceDataManagement["update-spacing-btn-wrapper"]}>
          <InputSubmit
            id="update"
            className={workspaceDataManagement["update-spacing-btn"]}
            value="Update"
          />
        </Div>
        <LongText
          className={workspaceDataManagement["workspace-controls-text"]}
        >
          Workspace Size Properties
        </LongText>
      </form>
    );
  } catch (err: any) {
    console.warn();
  }
};

export default WorkspaceSizeControls;
