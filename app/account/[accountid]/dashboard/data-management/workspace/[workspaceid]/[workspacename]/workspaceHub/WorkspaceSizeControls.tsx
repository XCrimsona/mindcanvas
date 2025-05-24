import {
  InputDisabledText,
  InputEnabledText,
  InputSubmit,
} from "@/src/components/form-elements/InputTypeInterfaces";
import Div from "@/src/ui/Div";
import workspaceSizeControls from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/workspace-controls.module.scss";
import LongText from "@/src/ui/LongText";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";

//Dynamic workspace width and height
const WorkspaceSizeControls = () => {
  try {
    const {
      workspaceHeight,
      workspaceWidth,
      updateDataBoardWorkspaceHeight,
      updateDataBoardWorkspaceWidth,
      toggleWorkspaceSizePropertiesState,
      workspaceSizePropertiesToggleState,
    } = useWorkspaceContext();

    return (
      <form
        className={workspaceSizeControls["workspace-size-controls"]}
        // onSubmit={() => {
        //save width and height to db
        //use comm notification lib to communicate
        // }}
      >
        {/* make height and width editable and immutable */}
        <Div className={workspaceSizeControls["height-container"]}>
          {workspaceSizePropertiesToggleState ? (
            <InputEnabledText
              id="mutable-height"
              className={workspaceSizeControls["mutable-height"]}
              value={workspaceHeight ? workspaceHeight : ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateDataBoardWorkspaceHeight(event.target.value);
              }}
              placeholder="Update height"
            />
          ) : (
            <InputDisabledText
              id="immutable-height"
              className={workspaceSizeControls["immutable-height"]}
              value={workspaceHeight ? workspaceHeight : "No DB height"}
            />
          )}
        </Div>
        <Div className={workspaceSizeControls["width-container"]}>
          {workspaceSizePropertiesToggleState ? (
            <InputEnabledText
              id=""
              className={workspaceSizeControls["mutable-width"]}
              value={workspaceWidth ? workspaceWidth : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // e.preventDefault();
                updateDataBoardWorkspaceWidth(e.target.value);
              }}
              placeholder="Update width"
            />
          ) : (
            <InputDisabledText
              id=""
              className={workspaceSizeControls["immutable-width"]}
              value={workspaceWidth ? workspaceWidth : "No DB width"}
            />
          )}
        </Div>
        <Div className={workspaceSizeControls["toggle-visual-ops-wrapper"]}>
          <div
            id="toggle-visual-ops"
            className={workspaceSizeControls["toggle-visual-ops"]}
            onClick={() => {
              toggleWorkspaceSizePropertiesState(
                workspaceSizePropertiesToggleState
              );
            }}
          >
            {workspaceSizePropertiesToggleState
              ? "View Properies"
              : "Edit Properies"}
          </div>
        </Div>
        <Div className={workspaceSizeControls["update-spacing-btn-wrapper"]}>
          <InputSubmit
            id="update"
            className={workspaceSizeControls["update-spacing-btn"]}
            value="Update"
          />
        </Div>
        <LongText className={workspaceSizeControls["workspace-controls-text"]}>
          Workspace Size Properties
        </LongText>
      </form>
    );
  } catch (err: any) {
    console.warn(
      "Something went wrong inside WorkspaceSizeControls: ",
      err.message
    );
  }
};

export default WorkspaceSizeControls;

//update height and width for entire workspace
// const updateWorkspaceSizeProperties = async (
//   e: React.FormEvent<HTMLInputElement>
// ) => {
//   e.preventDefault();
//   const workspaceSizeData: any = {};
//   if (workspaceHeight) workspaceSizeData.height = workspaceHeight;
//   if (workspaceWidth) workspaceSizeData.width = workspaceWidth;
//   if (!workspaceSizeData.height || !workspaceSizeData.width) {
//     alert("Please fill the workspace size property fields!");
//     return;
//   } else {
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
// console.log("demo ok");
