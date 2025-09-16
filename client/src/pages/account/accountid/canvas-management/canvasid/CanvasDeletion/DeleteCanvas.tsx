import Div from "../src/ui/Div";
import React from "react";
import { useCanvasDeletionContext } from "../app/account/[accountid]/canvas-management/[canvasid]/delete-data/CanvasDeletionOpsContext";
import Button from "../src/components/form-elements/Button";
import deleteWorkspaceCSS from "../app/style-files/deleteworkspace.module.scss";
import LongText from "../src/ui/LongText";

const DeleteCanvas = ({ params }: { params: any }) => {
  const { canvasDeletionState, hitClickDelete, canvasDeletionToggle } =
    useCanvasDeletionContext();
  return (
    workspaceDeletionState && (
      <Div className={deleteWorkspaceCSS["workspace-deletion-interface"]}>
        <LongText className={deleteWorkspaceCSS["text-deletion-warning"]}>
          You are about to delete your workspace, {params.workspacename}.
          Carefully decide as this operation cannot be reversed.
        </LongText>
        <Div className={deleteWorkspaceCSS["workspace-caution-ops"]}>
          <Div className={deleteWorkspaceCSS["cancel-workspace-btn-wrapper"]}>
            <Button
              id="cancel-workspace-btn"
              className={deleteWorkspaceCSS["cancel-workspace-btn"]}
              onClick={workspaceDeletionToggle}
            >
              CANCEL
            </Button>
          </Div>
          <Div className={deleteWorkspaceCSS["delete-workspace-btn-wrapper"]}>
            <Button
              id="delete-workspace-btn"
              className={deleteWorkspaceCSS["delete-workspace-btn"]}
              onClick={hitClickDelete}
            >
              DELETE
            </Button>
          </Div>
        </Div>
      </Div>
    )
  );
};

export default DeleteCanvas;
