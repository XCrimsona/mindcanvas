import Button from "../../../../../components/form-elements/Button";
import { DivClass } from "../../../../../ui/Div";
//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import { createContext, ReactNode, useContext, useState } from "react";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import ShortText from "../../../../../ui/ShortText";

type TypeIICONContext = Record<string, boolean>;

interface IIconContextType {
  //This toggles the modification window that carries the edit and
  //delete component which is activated when a tsx component that carries the persisted data is clicked
  iIconState: TypeIICONContext;

  //toggle modification window
  updateIIconState: (fragmentId: string) => void;
}

const IIconContext = createContext<IIconContextType | undefined>(undefined);

export const IIconContextProvider = ({ children }: { children: ReactNode }) => {
  //modification state controller. context boolean state determines when the modification window appear by user interaction
  const [iIconState, setIIconState] = useState<Record<string, boolean>>({});
  //   console.log("iIconState unchanged: ", iIconState);
  const updateIIconState = (fragmentId: string) => {
    setIIconState((prev: any) => ({
      ...prev,
      [fragmentId]: !prev[fragmentId],
    }));
    // console.log("iIconState changed:", iIconState);
  };

  return (
    <IIconContext.Provider
      value={{
        iIconState,
        updateIIconState,
      }}
    >
      {children}
    </IIconContext.Provider>
  );
};

export const useIIconContext = () => {
  const context = useContext(IIconContext);
  if (!context) {
    throw new Error("useIIconContext must be used within IIconContext");
  }
  return context;
};
