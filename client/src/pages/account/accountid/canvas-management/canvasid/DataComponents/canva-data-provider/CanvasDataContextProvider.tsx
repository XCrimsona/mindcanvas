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

//Canvas view and editable toggler values
type TypeCanvasSizeContext = true | false;

//component hub button toggling core definitions
//component hub text button toggler values
type TypeTextContext = true | false;
//component hub Audio button toggler values
type TypeAudioContext = true | false;
//component hub Image button toggler values
type TypeImageContext = true | false;
//component hub text button toggler values
type TypeVideoContext = true | false;

type TypeCanvasData = any | null;
//Canvas data text input component types
type TypeCanvasInputContext = string | null;

interface ICanvasContextType {
  dataScrollBoardRef: RefObject<HTMLDivElement | null>;
  globalDraggingRef: RefObject<TypeGlobalDragRefContext>;

  //Global Text Component for data input
  textInputOffSet: RefObject<{ x: number; y: number }>;
  textToggleState: TypeTextContext;
  toggleTextState: () => void;
  textInputCompRef: RefObject<HTMLDivElement | null>;
  textInputCompPosRef: RefObject<{ x: number; y: number }>;

  //Global Audio Component for data input
  audioInputOffSet: RefObject<{ x: number; y: number }>;
  audioToggleState: TypeAudioContext;
  toggleAudioState: () => void;
  audioInputCompPosRef: RefObject<{ x: number; y: number }>;
  audioInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Image Component for data input
  imageInputOffSet: RefObject<{ x: number; y: number }>;
  imageToggleState: TypeImageContext;
  toggleImageState: () => void;
  imageInputCompPosRef: RefObject<{ x: number; y: number }>;
  imageInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Video Component for data input
  videoInputOffSet: RefObject<{ x: number; y: number }>;
  videoToggleState: TypeVideoContext;
  toggleVideoState: () => void;
  videoInputCompPosRef: RefObject<{ x: number; y: number }>;
  videoInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Data Component
  //Element used to carry database and responsible for mapping
  CanvasData: TypeCanvasData;
  updateCanvasData: () => void;

  //Canvas size, height and width
  canvasSizePropertiesToggleState: TypeCanvasSizeContext;
  toggleCanvasSizePropertiesState: (value: boolean) => void;
  canvasWidth: TypeCanvasInputContext;
  canvasHeight: TypeCanvasInputContext;
  updateDataBoardCanvasHeight: (height: string) => void;
  updateDataBoardCanvasWidth: (width: string) => void;
}

const CanvasContextType = createContext<ICanvasContextType | undefined>(
  undefined
);

const CanvasDataContextProvider = ({
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

  //Text Component
  //Canvas Text Button toggle logic on the ComponentHub popup box
  const textInputOffSet = useRef<any>({ x: 0, y: 0 });

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

  //Audio Component
  //Canvas Audio Button toggle logic on the ComponentHub popup box
  const audioInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [audioToggleState, setAudioToggleState] =
    useState<TypeAudioContext>(false);
  const toggleAudioState = () => {
    setAudioToggleState((prev) => (prev === false ? true : false));
  };

  //find audio input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const audioInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const audioInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //IMAGE Component
  //Canvas Image Button toggle logic on the ComponentHub popup box
  const imageInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [imageToggleState, setImageToggleState] =
    useState<TypeImageContext>(false);
  const toggleImageState = () => {
    setImageToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const imageInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const imageInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //VIDEO Component
  //Canvas Image Button toggle logic on the ComponentHub popup box
  const videoInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [videoToggleState, setVideoToggleState] =
    useState<TypeVideoContext>(false);
  const toggleVideoState = () => {
    setVideoToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const videoInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const videoInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //DATA
  //element used to carry database and responsible for mapping
  const [canvasData, setCanvasData] = useState<[]>([]);

  const updateCanvasData = async () => {
    const routeResponse = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/canvas-management/${params.workspaceid}`
    );
    const response: any = await routeResponse.json();
    // console.log("Canvas management page.tsx ", response);

    if (response.success !== true) {
      switch (response.code) {
        case "MISSING_ROUTE_DATA":
          alert(response.code);
          return {
            status: "empty",
            message: response.message,
          };
        case "MISSING_USER_DATA":
          alert(response.code);
          return {
            status: "empty",
            message: response.message,
          };
        case "SERVER_WORKSPACE_ERROR":
          alert(response.code);
          return {
            status: "error",
            message: response.message,
          };
        default:
          console.log("route error");

          return {
            status: "error",
            message: response.message || "Unhandled backend condition.",
          };
      }
    } else {
      setCanvasData(response);
    }

    return {
      status: "success",
      data: response.data,
    };
  };

  //Canvas height and width above Canvas Size Properties
  //toggle view and edit buttons
  const [canvasSizePropertiesToggleState, setCanvasSizePropertiesToggleState] =
    useState<TypeCanvasSizeContext>(false);

  const toggleCanvasSizePropertiesState = () => {
    setCanvasSizePropertiesToggleState((prev) =>
      prev === false ? true : false
    );
  };

  //to adjust the data-scroll-board div element's width
  const [canvasHeight, setCanvasSizeHeight] =
    useState<TypeCanvasInputContext>("");
  const updateDataBoardCanvasHeight = (height: string) => {
    setCanvasSizeHeight((prev) =>
      prev === CanvasHeight ? height : CanvasHeight
    );
  };

  //to adjust the data-scroll-board div element's height
  const [canvasWidth, setCanvasSizeWidth] =
    useState<TypeCanvasInputContext>("");
  const updateDataBoardCanvasWidth = (width: string) => {
    setCanvasSizeWidth((prev) => (prev === canvasWidth ? width : canvasWidth));
  };

  return (
    <CanvasContextType.Provider
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

        //Audio Button toggle functions
        audioInputOffSet,
        audioToggleState,
        toggleAudioState,
        audioInputCompRef,
        audioInputCompPosRef,

        //Image Button toggle functions
        imageInputOffSet,
        imageToggleState,
        toggleImageState,
        imageInputCompRef,
        imageInputCompPosRef,

        //Video Button toggle functions
        videoInputOffSet,
        videoToggleState,
        toggleVideoState,
        videoInputCompRef,
        videoInputCompPosRef,

        //data
        CanvasData,
        updateCanvasData,

        //Canvas size height and width
        canvasSizePropertiesToggleState,
        toggleCanvasSizePropertiesState,
        canvasHeight,
        canvasWidth,
        updateDataBoardCanvasHeight,
        updateDataBoardCanvasWidth,
      }}
    >
      {children}
    </CanvasContextType.Provider>
  );
};

export default CanvasDataContextProvider;

export const useCanvasContext = () => {
  const context = useContext(CanvasContextType);
  if (!context)
    throw new Error(
      "useCanvasContext must be used inside CanvasContextProvider"
    );
  return context;
};
