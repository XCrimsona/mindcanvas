"use client";
import Button from "@/src/components/form-elements/Button";
import imageComp from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";

import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";

export const ImageButton = () => {
  // Toggles Image state true or false to display or hide image component in DataContainer component.
  const { toggleImageState } = useWorkspaceContext();
  return (
    <Button
      id="image-comp"
      onClick={toggleImageState}
      className={imageComp["image-comp"]}
    >
      Image
    </Button>
  );
};
