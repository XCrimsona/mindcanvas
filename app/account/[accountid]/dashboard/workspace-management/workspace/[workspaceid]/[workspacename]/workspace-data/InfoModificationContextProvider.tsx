"use client";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import { createContext, ReactNode, useContext, useState } from "react";
import style from "@/app/style-files/modification-window.module.scss";
import { useWorkspaceContext } from "../DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import ShortText from "@/src/ui/ShortText";
type TypeModificationContext = true | false;
interface IModificationUseStateContextType {
  //state being toggled. This toggles the modification window that carries the edit and
  //delete component which is activated when a live db tsx component is double clicked in the browser
  modificationState: TypeModificationContext;

  //toggle modification window
  toggleModificationState: () => void;

  //tracks which component is being double clciked and
  //its is designed to pass objects of data to other functions that compile different pieces of
  //data and is used the component hub built in components that enables dynamic data creation
  dataComponent: Record<string, number>;
  setDataComponent: (componentData: any) => void;

  selectedComp: string | undefined;
  setSelectedComp: (componentId: any) => void;

  //invoked as a reacat component
  ModificationWindow: (data: any) => ReactNode;

  mouseDoubleClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  mouseClickDelete: (e: React.MouseEvent<HTMLParagraphElement>) => void;

  //state being toggled
  editState: TypeModificationContext;

  //toggle edit window
  toggleEditStateFunc: () => void;

  //tracks which component is being double clciked and
  // only work with the toggled element for editing data
  EditWindow: (data: any) => ReactNode;
}

const ModificationUseStateContext = createContext<
  IModificationUseStateContextType | undefined
>(undefined);

export const InfoModificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //modification state controller. context boolean state determines when the modification window appear by user interaction
  const [modificationState, setModificationState] =
    useState<TypeModificationContext>(false);
  const toggleModificationState = () => {
    setModificationState((prev) => (prev === false ? true : false));
  };

  //edit context
  const [editState, setEditState] = useState<TypeModificationContext>(false);
  const toggleEditStateFunc = () => {
    setEditState((prev) => (prev === false ? true : false));
  };

  //above component needs an updating function
  const [dataComponent, setDataComponent] = useState<Record<string, number>>(
    {}
  );

  //live data component's element id is stored inside and updated based on the double click
  // to set it and reset its value is empty string when the user clicks delete inside the
  // InfoModification window that deletes the component
  const [selectedComp, setSelectedComp] = useState<string>("");

  //find the double clicked element and modify data
  const editLiveDataElement = async (
    owner: string,
    _id: string,
    workspaceId: string,
    workspacename: string,
    componentType: string
  ) => {
    try {
      // console.log("owner: ", owner);
      // console.log("_id: ", _id);
      // console.log("workspaceid: ", workspaceId);
      // console.log("workspacename: ", workspacename);

      const editedRequest = await fetch(
        `http://localhost:3000/api/account/${owner}/dashboard/workspace-management/workspace/${workspaceId}/${workspacename}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // _id is the information component displayed from the database which the user created
            _id,
            componentType,
          }),
        }
      );
      if (editedRequest.ok) {
        alert("Component edit");
        return;
      } else {
        alert("Component edit failed");
        return;
      }
    } catch (error: any) {
      console.log("edit error: ", error.message);
      return;
    }
  };

  //From the WorkspaceContextProvider, it refreshes the displayed data after
  // data has been deleted using deleteLiveDataElement.
  const { updateWorkspaceData } = useWorkspaceContext();

  //deleteLiveDataElement deletes a live data by finding the id of the
  // data stored in the database
  const deleteLiveDataElement = async (
    owner: string,
    _id: string,
    workspaceId: string,
    workspacename: string,
    type: string
  ) => {
    try {
      // console.log("owner: ", owner);
      // console.log("_id: ", _id);
      // console.log("workspaceid: ", workspaceId);
      // console.log("workspacename: ", workspacename);

      const deleteRequest = await fetch(
        `http://localhost:3000/api/account/${owner}/dashboard/workspace-management/workspace/${workspaceId}/${workspacename}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // _id is the information component displayed from the database which the user created
            _id,
            //component type
            type,
          }),
        }
      );
      if (deleteRequest.ok) {
        updateWorkspaceData();
        return;
      } else {
        alert("Component deletion failed");
        return;
      }
    } catch (error: any) {
      console.log("edit error: ", error.message);
      return;
    }
  };

  //ReactNode and live component data
  const EditWindow = (editData: any) => {
    const { data } = editData;
    console.log(data);

    const { owner, _id, workspaceId, workspacename, type, text } = data;
    console.log(owner, _id, workspaceId, workspacename, type);

    return (
      <Div className={style["edit-window-container"]}>
        <ShortText className={style["p-component-heading"]}>
          You are editing:
        </ShortText>
        <Div className={style["box-one"]}>
          <ShortText className={style[""]}>Currently editing:</ShortText>
          <ShortText className={style["compoent-name"]}>{_id}</ShortText>
          <Button
            id="change-windows"
            onClick={(e: any) => {
              toggleEditStateFunc();
              toggleModificationState();
            }}
            className={style["change-windows"]}
          >
            Back
          </Button>
        </Div>
        <Div className={style["box-two"]}>
          <textarea cols={60} disabled rows={10} value={text}></textarea>
        </Div>
        <Div className={style["box-theee"]}>
          <textarea cols={60} rows={10}></textarea>
          <hr
            style={{ width: "94%", marginLeft: "auto", marginRight: "auto" }}
          />
          <Button
            className={style["update-button"]}
            id="edit-button"
            onClick={() => {
              // _id is the componont being edited
              // editLiveDataElement(owner, _id, workspaceId, workspacename, type);
              console.log(data);
            }}
          >
            Update
          </Button>
        </Div>
      </Div>
    );
  };

  //this mouse double click event is fired when a live data component is selected and stores
  // the found data element's id in selectedComp
  const mouseDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const doubleClickedElement = (e.target as HTMLElement).id;

    setSelectedComp((prev: any) => {
      if (prev === doubleClickedElement) {
        return "";
      } else {
        return doubleClickedElement;
      }
    });
    toggleModificationState();
    return;
  };

  //this mouse click event is fired when a live data element is already selected
  // and then removed from the selectedComp that has been stored when the mouse
  // double click event was fired.
  const mouseClickDelete = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const clickedElement = (e.target as HTMLElement).id;
    console.log("clickedElement: ", clickedElement);
    if (clickedElement) {
      setSelectedComp("");
    }
    toggleModificationState();
  };

  //used to collapse the modification window and display the edit window

  const ModificationWindow = (componentData: any) => {
    const { data } = componentData;
    const { owner, _id, workspaceId, workspacename, type } = data;
    // console.log(owner, _id, workspaceId, workspacename, type);

    return (
      <Div className={style["window-modifications-window-container"]}>
        <Button
          className={style["edit-button"]}
          id="edit-button"
          onClick={() => {
            toggleModificationState();
            toggleEditStateFunc();
          }}
        >
          Edit
        </Button>
        <hr style={{ width: "94%", marginLeft: "auto", marginRight: "auto" }} />
        <Button
          className={style["delete-button"]}
          id={`${_id}`}
          onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
            mouseClickDelete(e);
            deleteLiveDataElement(owner, _id, workspaceId, workspacename, type);
          }}
        >
          Delete
        </Button>
      </Div>
    );
  };
  return (
    <ModificationUseStateContext.Provider
      value={{
        editState,
        toggleEditStateFunc,
        dataComponent,
        setDataComponent,
        EditWindow,
        modificationState,
        toggleModificationState,
        ModificationWindow,
        selectedComp,
        setSelectedComp,
        mouseDoubleClick,
        mouseClickDelete,
      }}
    >
      {children}
    </ModificationUseStateContext.Provider>
  );
};

export const useModificationUseState = () => {
  const context = useContext(ModificationUseStateContext);
  if (!context) {
    throw new Error(
      "useModificationUseState must be used within ModificationUseStateContext"
    );
  }
  return context;
};
