"use client";
import Button from "@/src/components/form-elements/Button";
import videoComp from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";

export const VideoButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleVideoState } = useWorkspaceContext();
  return (
    <Button
      id="video-comp"
      onClick={toggleVideoState}
      className={videoComp["video-comp"]}
    >
      Video
    </Button>
  );
};
