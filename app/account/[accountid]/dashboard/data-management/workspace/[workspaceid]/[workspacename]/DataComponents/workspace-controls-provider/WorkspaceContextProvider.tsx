"use client";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

//

//for all draggable items inside the data-scroll-board
type TypeGlobalDragRefContext = true | false;

//workspace view and editable toggler values
type TypeWorkspaceSizeContext = true | false;

//component hub button toggling core definitions
//component hub text button toggler values
type TypeTextContext = true | false;
//component hub Audio button toggler values
// type TypeAudioContext = true | false;
//component hub Image button toggler values
// type TypeImageContext = true | false;
//component hub text button toggler values
// type TypeVideoContext = true | false;

type TypeWorkspaceData = any | null;
//workspace data text input component types
type TypeWorkspaceInputContext = string | null;

interface IWorkspaceContextType {
  dataScrollBoardRef: RefObject<HTMLDivElement | null>;
  textInputOffSet: RefObject<{ x: number; y: number }>;
  globalDraggingRef: RefObject<TypeGlobalDragRefContext>;
  textToggleState: TypeTextContext;
  toggleTextState: () => void;

  textInputCompRef: RefObject<HTMLDivElement | null>;
  textInputCompPosRef: RefObject<{ x: number; y: number }>;
  // audioInputCompRef: RefObject<HTMLDivElement | null>;
  // imageInputCompRef: RefObject<HTMLDivElement | null>;
  // videoInputCompRef: RefObject<HTMLDivElement | null>;

  //for mapping data
  workspaceData: TypeWorkspaceData;
  updateWorkspaceData: () => void;
  //workspace size, height and width
  workspaceSizePropertiesToggleState: TypeWorkspaceSizeContext;
  toggleWorkspaceSizePropertiesState: (value: boolean) => void;
  workspaceWidth: TypeWorkspaceInputContext;
  workspaceHeight: TypeWorkspaceInputContext;
  updateDataBoardWorkspaceHeight: (height: string) => void;
  updateDataBoardWorkspaceWidth: (width: string) => void;
}

const WorkspaceContextType = createContext<IWorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceContextProvider = ({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) => {
  //globally assigned window
  const dataScrollBoardRef = useRef<HTMLDivElement>(null);
  //used as failsafe to prevent accidental drags
  const globalDraggingRef = useRef<TypeGlobalDragRefContext>(false);

  const textInputOffSet = useRef<any>({ x: 0, y: 0 });
  //Workspace Text Button toggle logic on the ComponentHub popup box
  const [textToggleState, setTextToggleState] =
    useState<TypeTextContext>(false);

  const toggleTextState = () => {
    setTextToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const textInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const textInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  // const audioInputCompRef = useRef<HTMLDivElement | null>(null);
  // const audioInputPosRef = useRef<HTMLDivElement | null>(null);

  // const imageInputCompRef = useRef<HTMLDivElement | null>(null);
  // const imageInputPosRef = useRef<HTMLDivElement | null>(null);

  // const videoInputCompRef = useRef<HTMLDivElement | null>(null);
  // const videoInputPosRef = useRef<HTMLDivElement | null>(null);

  //element used to carry database and responsible for mapping
  const [workspaceData, setWorkspaceData] = useState<any>(null);

  const updateWorkspaceData = async () => {
    const routeResponse = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`
    );
    if (routeResponse.ok) {
      const response = await routeResponse.json();
      console.log("user db data from ContextProvider: ", response);

      setWorkspaceData(response.data);
    } else {
      alert("Failed to update workspace data");
      return;
    }
  };

  //workspace height and width above Workspace Size Properties
  //toggle view and edit buttons
  const [
    workspaceSizePropertiesToggleState,
    setWorkspaceSizePropertiesToggleState,
  ] = useState<TypeWorkspaceSizeContext>(false);

  const toggleWorkspaceSizePropertiesState = () => {
    setWorkspaceSizePropertiesToggleState((prev) =>
      prev === false ? true : false
    );
  };

  //to adjust the data-scroll-board div element's width
  const [workspaceHeight, setWorkspaceSizeHeight] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceHeight = (height: string) => {
    setWorkspaceSizeHeight((prev) =>
      prev === workspaceHeight ? height : workspaceHeight
    );
  };

  //to adjust the data-scroll-board div element's height
  const [workspaceWidth, setWorkspaceSizeWidth] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceWidth = (width: string) => {
    setWorkspaceSizeWidth((prev) =>
      prev === workspaceWidth ? width : workspaceWidth
    );
  };

  return (
    <WorkspaceContextType.Provider
      value={{
        dataScrollBoardRef,
        //draggable boolean failsafe unit to prevent accidental drag event through
        // mouse all components that use mouseevents
        globalDraggingRef,

        //Text Button toggle functions
        textInputOffSet,
        textToggleState,
        toggleTextState,
        textInputCompPosRef,
        textInputCompRef,

        //data
        workspaceData,
        updateWorkspaceData,

        //workspace size height and width
        workspaceSizePropertiesToggleState,
        toggleWorkspaceSizePropertiesState,
        workspaceHeight,
        workspaceWidth,
        updateDataBoardWorkspaceHeight,
        updateDataBoardWorkspaceWidth,
      }}
    >
      {children}
    </WorkspaceContextType.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContextType);
  if (!context)
    throw new Error(
      "useWorkspaceContext must be used inside WorkspaceContextProvider"
    );
  return context;
};

/*"use client";
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

*/
