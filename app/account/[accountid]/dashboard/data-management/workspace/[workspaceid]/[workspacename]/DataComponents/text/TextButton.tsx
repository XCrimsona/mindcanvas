"use client";
import Button from "@/src/components/form-elements/Button";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";

import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";

export const TextButton = () => {
  const { toggleTextState } = useWorkspaceContext();
  return (
    <Button
      id="text-comp"
      onClick={toggleTextState}
      className={workspaceDataManagement["text-comp"]}
    >
      Text
    </Button>
  );
};
