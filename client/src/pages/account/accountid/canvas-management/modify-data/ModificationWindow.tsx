import { useModificationContext } from "./InfoModificationContextProvider";
// import StyleDiv from "../../../../../../../src/ui/StylerDiv";
import "./modification-window.css";
import Button from "../../../../../components/form-elements/Button";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import React from "react";

//When the i round button on the left of a data fragment is clicked, ModificationWindow is an options box
export const ModificationWindow = ({ componentData }: any) => {
  const {
    toggleEditStateFunc,
    toggleModificationState,
    mouseClickDelete,
    deleteLiveDataElement,
  } = useModificationContext();
  const { toggleMediaWindowState } = useCanvasContext();
  const { owner, _id, workspaceId, type } = componentData;
  return (
    <div className={"modifications-window-container"}>
      <Button
        className={"edit-button"}
        id="edit-button"
        onClick={() => {
          toggleModificationState();
          toggleEditStateFunc();
        }}
      >
        Edit
      </Button>
      <hr
        style={{
          width: "94%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Button
        className={"component-reposition-button"}
        id="component-reposition-button"
        onClick={() => {
          //Collapse the button options window
          toggleModificationState();

          //We dont want to display the edit window as we are toggling

          //Open the interface to move the selected component data to a new x y postion bas on it dragging
          toggleMediaWindowState();
        }}
      >
        Reorganize data fragment
      </Button>
      <hr
        style={{
          width: "94%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Button
        className={"delete-button"}
        id=""
        // id={`${_id}`}
        onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
          mouseClickDelete(e);
          deleteLiveDataElement(owner, _id, workspaceId, type);
          // return;
        }}
      >
        Delete
      </Button>
    </div>
  );
};
