"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type TypeWorkspaceSizeContext = true | false;
type TypeWorkspaceInputContext = string | null;
interface IWorkspaceSizeContextType {
  workspaceSizePropertiesToggleState: TypeWorkspaceSizeContext;
  toggleWorkspaceSizePropertiesState: (value: boolean) => void;
  workspaceWidth: TypeWorkspaceInputContext;
  workspaceHeight: TypeWorkspaceInputContext;
  updateDataBoardWorkspaceHeight: (height: string) => void;
  updateDataBoardWorkspaceWidth: (width: string) => void;
}

const WorkspaceSizeContext = createContext<
  IWorkspaceSizeContextType | undefined
>(undefined);

export const WorkspaceSizeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [
    workspaceSizePropertiesToggleState,
    setWorkspaceSizePropertiesToggleState,
  ] = useState<TypeWorkspaceSizeContext>(false);

  const toggleWorkspaceSizePropertiesState = () => {
    setWorkspaceSizePropertiesToggleState((prev) =>
      prev === false ? true : false
    );
  };

  const [workspaceHeight, setWorkspaceSizeHeight] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceHeight = (height: string) => {
    setWorkspaceSizeHeight((prev) =>
      prev === workspaceHeight ? height : workspaceHeight
    );
  };

  const [workspaceWidth, setWorkspaceSizeWidth] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceWidth = (width: string) => {
    setWorkspaceSizeWidth((prev) =>
      prev === workspaceWidth ? width : workspaceWidth
    );
  };

  return (
    <WorkspaceSizeContext.Provider
      value={{
        workspaceSizePropertiesToggleState,
        toggleWorkspaceSizePropertiesState,
        workspaceHeight,
        workspaceWidth,
        updateDataBoardWorkspaceHeight,
        updateDataBoardWorkspaceWidth,
      }}
    >
      {children}
    </WorkspaceSizeContext.Provider>
  );
};

export const useWorkspaceSizeContext = () => {
  const context = useContext(WorkspaceSizeContext);
  if (!context)
    throw new Error(
      "useSharedUseState must be used inside TextContextProvider"
    );
  return context;
};
