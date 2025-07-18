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
  modificationToggleState: TypeModificationContext;

  //toggle modification window
  toggleModificationState: () => void;

  //tracks which component is being double clciked and
  // only work with the toggled element for editing data
  dataComponent: Record<string, number>;
  setDataComponent: (componentData: any) => void;
  ModificationWindow: (data: any) => ReactNode;
}

const ModificationUseStateContext = createContext<
  IModificationUseStateContextType | undefined
>(undefined);

export const ModificationUseStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modificationToggleState, setModificationToggleState] =
    useState<TypeModificationContext>(false);
  const toggleModificationState = () => {
    setModificationToggleState((prev) => (prev === false ? true : false));
  };

  const [dataComponent, setDataComponent] = useState<Record<string, number>>(
    {}
  );
  //above component needs an updating function

  //find the double clicked element and modify data
  const editLiveDataElement = async (
    owner: string,
    componentid: string,
    workspaceid: string,
    workspacename: string
  ) => {
    try {
      console.log(componentid);

      const editedRequest = await fetch(
        `http://localhost:3000/api/account/${owner}/dashboard/workspace-management/workspace/${workspaceid}/${workspacename}`
      );
      if (editedRequest.ok) {
        //ok response
        return;
      } else {
        //failed to respond
        return;
      }
    } catch (error: any) {
      console.log("edit error: ", error.message);
      return;
    }
  };
  const ModificationWindow = (componentData: any) => {
    const { data } = componentData;

    const { owner, _id, workspaceid, workspacename } = data;

    return (
      <Div className={style["window-modifications-window-container"]}>
        <Button
          className={style["edit-button"]}
          id="edit-button"
          onClick={() => {
            editLiveDataElement(owner, _id, workspaceid, workspacename);
            console.log(data);
            // console.log("edit with id access", data);
            // editLiveDataElement();
          }}
        >
          Edit
        </Button>
        <hr style={{ width: "94%", marginLeft: "auto", marginRight: "auto" }} />
        <Button
          className={style["delete-button"]}
          id="delete-button"
          onClick={() => {
            console.log("delete the data piece alone");
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
        modificationToggleState,
        toggleModificationState,
        dataComponent,
        setDataComponent,
        ModificationWindow,
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
