import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import canvaNotification_Delete from "../notifications/canva-deletes/CanvaNotification_Delete";
import canvaNotification_DeleteFailed from "../notifications/canva-deletes/CanvaNotification_DeleteFailed";

type TypeCanvasDeletionOpsContext = true | false;

interface ICanvasDeletionContext {
  canvasDeletionState: TypeCanvasDeletionOpsContext;
  canvasDeletionToggle: () => void;
  hitClickDelete: () => void;
  canvasName: string;
  setCanvasName: (workspacename: string) => void;
}

const CanvasContextDeletionType = createContext<
  ICanvasDeletionContext | undefined
>(undefined);

export const CanvasContextDeletionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userid, canvaid } = useParams();

  const router = useNavigate();
  const [canvasDeletionState, setCanvasDeletionState] =
    useState<TypeCanvasDeletionOpsContext>(false);

  const [canvasName, setCanvasName] = useState<string>("");
  const canvasDeletionToggle = async () => {
    setCanvasDeletionState((prev: any) => (prev === false ? true : false));
  };
  // console.log(source);
  const hitClickDelete = async () => {
    const deleteWorkspace = { type: "Workspace" };

    const response = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(deleteWorkspace),
      }
    );
    if (response.ok) {
      setCanvasName("");
      canvasDeletionToggle();
      canvaNotification_Delete();
      router(`/account/${userid}/canvas-management`);
    } else {
      canvaNotification_DeleteFailed();
      return;
    }
  };
  return (
    <CanvasContextDeletionType.Provider
      value={{
        canvasDeletionState,
        canvasDeletionToggle,
        hitClickDelete,
        canvasName,
        setCanvasName,
      }}
    >
      {children}
    </CanvasContextDeletionType.Provider>
  );
};

export const useCanvasDeletionContext = () => {
  const context = useContext(CanvasContextDeletionType);
  if (!context) {
    throw new Error(
      "useCanvasDeletionContext must be used within a CanvasContextDeletionProvider"
    );
  }
  return context;
};
