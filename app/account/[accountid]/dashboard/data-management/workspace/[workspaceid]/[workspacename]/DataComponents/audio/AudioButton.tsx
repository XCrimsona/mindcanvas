"use client";
import Button from "@/src/components/form-elements/Button";
import audioComp from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";

import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";

export const AudioButton = () => {
  //Toggles Audio state true or false to display or hide audio component in DataContainer component.
  const { toggleAudioState } = useWorkspaceContext();
  return (
    <Button
      id="audio-comp"
      onClick={toggleAudioState}
      className={audioComp["audio-comp"]}
    >
      Audio
    </Button>
  );
};
