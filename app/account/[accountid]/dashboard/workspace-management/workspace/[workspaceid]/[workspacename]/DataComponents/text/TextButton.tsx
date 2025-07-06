"use client";
import Button from "@/src/components/form-elements/Button";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import textComp from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";
export const TextButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleTextState } = useWorkspaceContext();
  return (
    <Button
      id="text-comp"
      onClick={toggleTextState}
      className={textComp["text-comp"]}
    >
      Text
    </Button>
  );
};
