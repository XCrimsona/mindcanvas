//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import { createContext, ReactNode, useContext, useState } from "react";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import canvaNotification_Edit from "../notifications/fragment-updates/CanvaNotification_Edit";
import canvaNotification_EditFailed from "../notifications/fragment-updates/CanvaNotification_EditFailed";
// import canvaNotification_Delete from "../notifications/canva-deletes/CanvaNotification_Delete";
import canvaNotification_TextFragmentDeleted from "../notifications/fragment-deletes/CanvaNotification_TextFragmentDeleted";
import canvaNotification_TextFragmentDeletedFailed from "../notifications/fragment-deletes/CanvaNotification_TextFragmentDeleteFailed";

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

  mouseDoubleClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  mouseClickDelete: (e: React.MouseEvent<HTMLParagraphElement>) => void;

  //state being toggled
  editState: TypeModificationContext;

  //toggle edit window
  toggleEditStateFunc: () => void;

  //tracks which component is being double clciked and
  // only work with the toggled element for editing data
  newComponentData: string;
  setComponentData: (text: string) => void;
  editLiveDataElement: (
    _id: string,
    userid: string,
    canvaid: string,
    type: string,
    text: string
  ) => void;

  deleteLiveDataElement: (
    userid: string,
    _id: string,
    canvaid: string,
    // workspacename: string,
    componentType: string
  ) => void;

  updateComponentData: (data: string) => void;
}

const ModificationContext = createContext<
  IModificationUseStateContextType | undefined
>(undefined);

const InfoModificationContextProvider = ({
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
  //From the WorkspaceContextProvider, it refreshes the displayed data after
  // data has been deleted using deleteLiveDataElement.
  const { updateCanvasData, updateMediaCanvaDataFragment } = useCanvasContext();

  // const { updateWorkspaceData } = useWorkspaceContext();
  //find the double clicked element and modify data
  const editLiveDataElement = async (
    userid: string,
    _id: string,
    canvaid: string,
    type: string,
    text: string
  ) => {
    try {
      const updateType = "Text";

      const editedRequest = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            // _id is the information component primary key
            _id: _id,
            type: type,
            updateType: updateType,
            text: text,
          }),
        }
      );
      if (editedRequest.ok) {
        canvaNotification_Edit();
        updateCanvasData();
        return;
      } else {
        canvaNotification_EditFailed();
        return;
      }
    } catch (error: any) {
      console.log("edit error: ", error.message);
      return;
    }
  };

  //deleteLiveDataElement deletes a live data by finding the id of the
  // data stored in the database
  const deleteLiveDataElement = async (
    userid: string,
    _id: string,
    canvaid: string,
    type: string
  ) => {
    try {
      const deleteRequest = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
        {
          method: "DELETE",
          credentials: "include",
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
        canvaNotification_TextFragmentDeleted();
        updateCanvasData();
        return;
      } else {
        canvaNotification_TextFragmentDeletedFailed();
        return;
      }
    } catch (error: any) {
      console.warn("edit error: ", error.message);
      return;
    }
  };

  const [newComponentData, setComponentData] = useState<string>("");

  const updateComponentData = (data: string) => {
    setComponentData(data);
    return;
  };

  //this mouse double click event is fired when a live data component is selected and stores
  //the found data element's id in selectedComp
  const mouseDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const doubleClickedElement = (e.target as HTMLElement).id;
    const doubleClickedElementValues = e.target as HTMLElement;
    setSelectedComp((prev: any) => {
      if (prev === doubleClickedElement) {
        return "";
      } else {
        return doubleClickedElement;
      }
    });
    //left and top value of the double clicked element
    const left =
      doubleClickedElementValues.parentElement?.parentElement?.parentElement
        ?.style.left;
    const top =
      doubleClickedElementValues.parentElement?.parentElement?.parentElement
        ?.style.top;

    updateMediaCanvaDataFragment({
      doubleClickedElementValues,
      doubleClickedElement,
      left,
      top,
    });
    toggleModificationState();
    return;
  };

  //this mouse click event is fired when a live data element is already selected
  // and then removed from the selectedComp that has been stored when the mouse
  // double click event was fired.
  const mouseClickDelete = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const clickedElement = (e.target as HTMLElement).id;
    if (clickedElement) {
      setSelectedComp("");
    }
    toggleModificationState();
  };

  return (
    <ModificationContext.Provider
      value={{
        editState,
        toggleEditStateFunc,
        dataComponent,
        setDataComponent,
        newComponentData,
        setComponentData,
        modificationState,
        toggleModificationState,
        editLiveDataElement,
        deleteLiveDataElement,
        updateComponentData,
        selectedComp,
        setSelectedComp,
        mouseDoubleClick,
        mouseClickDelete,
      }}
    >
      {children}
    </ModificationContext.Provider>
  );
};
export default InfoModificationContextProvider;

export const useModificationContext = () => {
  const context = useContext(ModificationContext);
  if (!context) {
    throw new Error(
      "useModificationContext must be used within ModificationContext"
    );
  }
  return context;
};
