import { ReactNode, createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

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
  params,
}: {
  params: any;
  children: ReactNode;
}) => {
  const router = useRouter();
  const [canvasDeletionState, setCanvasDeletionState] =
    useState<TypeWorkspaceDeletionOpsContext>(false);

  const [canvasName, setCanvasName] = useState<string>("");
  const canvasDeletionToggle = async () => {
    setCanvasDeletionState((prev) => (prev === false ? true : false));
  };

  const hitClickDelete = async () => {
    const deleteWorkspace = { type: "Workspace" };

    const response = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/canvas-management/${params.workspaceid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteWorkspace),
      }
    );
    if (response.ok) {
      setCanvasName("");
      canvasDeletionToggle();
      // alert("Moving you to the canva redirected");
      router.push(
        `http://localhost:3000/account/${params.accountid}/canvas-management`
      );
    } else {
      alert("Canvas deletion failed.");
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
      "useCanvasContext must be used within a CanvasContextProvider"
    );
  }
  return context;
};
