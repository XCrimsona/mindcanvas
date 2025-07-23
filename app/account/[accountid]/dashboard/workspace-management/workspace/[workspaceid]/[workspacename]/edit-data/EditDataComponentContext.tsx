"use client";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import { createContext, ReactNode, useContext, useState } from "react";
import style from "@/app/style-files/modification-window.module.scss";
type TypeModificationContext = true | false;
interface IModificationUseStateContextType {
  //state being toggled
  toggleEditState: TypeModificationContext;

  //toggle modification window
  toggleEditStateFunc: () => void;

  //tracks which component is being double clciked and
  // only work with the toggled element for editing data
  dataComponent: Record<string, number>;
  setDataComponent: (componentData: any) => void;
  EditWindow: (data: any) => ReactNode;
}

const EditUseStateContext = createContext<
  IModificationUseStateContextType | undefined
>(undefined);

export const EditUseStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toggleEditState, setModificationToggleState] =
    useState<TypeModificationContext>(false);
  const toggleEditStateFunc = () => {
    setModificationToggleState((prev) => (prev === false ? true : false));
  };

  const [dataComponent, setDataComponent] = useState<Record<string, number>>(
    {}
  );
  //above component needs an updating function

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

  const EditWindow = (componentData: any) => {
    const { data } = componentData;
    // console.log(data);

    const { owner, _id, workspaceId, workspacename, type } = data;
    console.log(owner, _id, workspaceId, workspacename, type);

    return (
      <Div className={style["window-modifications-window-container"]}>
        <Button
          className={style["edit-button"]}
          id="edit-button"
          onClick={() => {
            // _id is the componont being edited
            editLiveDataElement(owner, _id, workspaceId, workspacename, type);
            console.log(data);
            // console.log("edit with id access", data);
            // editLiveDataElement();
          }}
        >
          Update
        </Button>
        <hr style={{ width: "94%", marginLeft: "auto", marginRight: "auto" }} />
      </Div>
    );
  };
  return (
    <EditUseStateContext.Provider
      value={{
        toggleEditState,
        toggleEditStateFunc,
        dataComponent,
        setDataComponent,
        EditWindow,
      }}
    >
      {children}
    </EditUseStateContext.Provider>
  );
};

export const useEditComponent = () => {
  const context = useContext(EditUseStateContext);
  if (!context) {
    throw new Error("useEditComponent must be used within EditUseStateContext");
  }
  return context;
};
