import Button from "../src/components/form-elements/Button";
import Div from "../src/ui/Div";
//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import { createContext, ReactNode, useContext, useState } from "react";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import ShortText from "../src/ui/ShortText";
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

  editLiveDataElement: (
    _id: string,
    owner: string,
    workspaceId: string,
    workspacename: string,
    text: string
  ) => void;

  deleteLiveDataElement: (
    owner: string,
    _id: string,
    workspaceId: string,
    workspacename: string,
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

  // const { updateWorkspaceData } = useWorkspaceContext();
  //find the double clicked element and modify data
  const editLiveDataElement = async (
    owner: string,
    _id: string,
    workspaceId: string,
    workspacename: string,
    text: string
  ) => {
    try {
      // _id: string,
      //     owner: string,
      //     workspaceId: string,
      //     workspacename: string,
      //     text:string,
      //     componentType: string

      console.log("owner: ", owner);
      console.log("_id: ", _id);
      console.log("workspaceid: ", workspaceId);
      console.log("workspacename: ", workspacename);
      console.log("text: ", text);
      // const editOperationType = "ComponentEditOperation";
      const editOperationType = "Text";

      const editedRequest = await fetch(
        `http://localhost:3000/api/account/${owner}/canvas-management/${workspaceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // _id is the information component displayed from the database which the user created
            _id: _id,
            type: editOperationType,
            // type,
            text: text,
          }),
        }
      );
      if (editedRequest.ok) {
        updateWorkspaceData();
        alert("updated");

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
  const { updateCanvasData } = useCanvasContext();

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
        `http://localhost:3000/api/account/${owner}/canvas-management/${workspaceId}`,
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

  const [newComponentData, setComponentData] = useState<string>("");

  const updateComponentData = (data: string) => {
    setComponentData(data);
    return;
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

  return (
    <ModificationContext.Provider
      value={{
        editState,
        toggleEditStateFunc,
        dataComponent,
        setDataComponent,
        newComponentData,
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
